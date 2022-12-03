import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable, Subject, takeUntil } from 'rxjs';

import { Flight } from '../shared/models/flight.models';
import { getAllFlights } from '../Store/flights-store/flights-actions';
import { selectAllFlights } from '../Store/flights-store/flights.selector';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading: Observable<boolean>;
  searchForm: FormGroup;

  allFlights: Observable<{
    from: string[];
    to: string[];
    dateFrom: string[];
    dateTo: any[];
  }>;
  private unsubscribe$ = new Subject<void>();

  dateFromData: any[] = [];
  constructor(private store: Store, private datePipe: DatePipe) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.store.dispatch(getAllFlights());
    this.initForm();
    this.allFlights = this.store.select(selectAllFlights);
  }

  // removeLeadingZeros: any[] = [];
  // uniqueDates: any[] = [];
  myFilter = (d: Date): any => {
    let uniqueDates = [];
    let day = d?.toJSON().substring(0, 10);
    console.log(day);
    //console.log(this.dateFromData);
    this.allFlights
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        let tempArray = data.dateFrom;
        uniqueDates = [...new Set(tempArray)];

        console.log(uniqueDates);
      });
    return uniqueDates.some((el) => el == day);

    // let day = d?.getDate();
    // // console.log(day);
    // //console.log(this.dateFromData);
    // this.allFlights
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data: any) => {
    //     //   console.log(data);
    //     let splitted = [];
    //     let lastEl;
    //     let uniqueDates = [];
    //     for (let el of data.dateFrom) {
    //       if (el !== undefined) {
    //         lastEl = el.split('-');
    //         console.log(el);
    //         splitted.push(lastEl[2]);
    //         uniqueDates = [...new Set(splitted)];
    //         // lastEl = el.substring(6, 10);
    //       }
    //       //  splitted.push(lastEl);
    //     }
    //     // let removeLeadingZeros = uniqueDates.map((i) => i.replace('0', ''));
    //     this.removeLeadingZeros = uniqueDates.map((i) => {
    //       return parseInt(i, 10);
    //     });
    //     // let convertTostring = removeLeadingZeros.map((i) => i.toString());
    //     console.log(day);
    //     //  console.log(convertTostring);
    //     // for (let el of removeLeadingZeros) {
    //     //   //  return day !== el;
    //     // //  this.temp = el;
    //     // }
    //   });
    // return this.removeLeadingZeros.some((el) => el == day);
    // el = d?.getDate();
    //  console.log(el);
  };

  myFilter2 = (dates: any) => {
    // //  for(let el of dates.from){
    // //   let newDay =
    // //  }
    // let newDays = dates?.dateFrom.map((el) => {
    //   if (el && el !== undefined) {
    //     return new Date(el).toJSON().substring(0, 10);
    //   }
    // });
    // return newDays;
    // console.log('newDays=', newDays);
  };

  initForm() {
    this.searchForm = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      seats: new FormControl('economy', [Validators.required]),
      passengers: new FormControl(null, [Validators.required]),
    });
    //  console.log(this.searchForm);

    this.searchForm.get('dateFrom').valueChanges.subscribe((val) => {
      const newDateFromVal = this.datePipe.transform(val, 'yyyy-MM-dd');
      this.searchForm
        .get('dateFrom')
        .patchValue(newDateFromVal, { emitEvent: false });
      console.log(this.searchForm.value.dateFrom);
    });

    this.searchForm.get('dateTo').valueChanges.subscribe((val) => {
      const newDateToVal = this.datePipe.transform(val, 'yyyy-MM-dd');
      this.searchForm
        .get('dateTo')
        .patchValue(newDateToVal, { emitEvent: false });
      console.log(this.searchForm.value.dateTo);
    });
  }
}
