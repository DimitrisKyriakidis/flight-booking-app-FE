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
  minDate: Date;
  maxDate: Date;

  myHolidayDates: any = [
    new Date(),
    new Date('12/20/2020'),
    new Date('12/17/2020'),
    new Date('12/25/2020'),
    new Date('12/4/2020'),
    new Date('12/7/2020'),
    new Date('12/12/2020'),
    new Date('12/11/2020'),
    new Date('12/26/2020'),
    new Date('12/25/2020'),
  ];
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

  uniqueDates: any[] = [];
  myFilter = (d: Date): any => {
    let day = d?.toJSON().substring(0, 10);
    console.log(day);
    //console.log(this.dateFromData);
    this.allFlights
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        let tempArray = data.dateFrom;
        this.uniqueDates = [...new Set(tempArray)];

        console.log(this.uniqueDates);
      });
    return this.uniqueDates.some((el) => el == day);
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
