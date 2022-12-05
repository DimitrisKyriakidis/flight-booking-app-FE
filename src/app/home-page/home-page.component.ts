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
import { datesRangeValidator } from '../shared/validators/datesValidator';
import {
  FlightsActionTypes,
  getAllFlights,
} from '../Store/flights-store/flights-actions';
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

  submitted: boolean = false;

  allFlights: Observable<{
    from: string[];
    to: string[];
    dateFrom: string[];
    dateTo: any[];
  }>;
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.store.dispatch(getAllFlights());
    this.initForm();
    this.allFlights = this.store.select(selectAllFlights);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    this.searchForm = new FormGroup(
      {
        from: new FormControl(null, {
          updateOn: 'blur',
          validators: Validators.required,
        }),
        to: new FormControl(null, [Validators.required]),
        dateFrom: new FormControl(null),
        dateTo: new FormControl(null),
        seatType: new FormControl('economy', [Validators.required]),
        passengers: new FormControl(null, [Validators.required]),
      },
      {
        validators: [datesRangeValidator()],
        updateOn: 'blur',
      }
    );

    this.dateFromControl.valueChanges.subscribe((val) => {
      const newDateFromVal = this.datePipe.transform(val, 'yyyy-MM-dd');
      this.dateFromControl.patchValue(newDateFromVal, { emitEvent: false });
      console.log(this.searchForm.value.dateFrom);
    });

    this.dateToControl.valueChanges.subscribe((val) => {
      const newDateToVal = this.datePipe.transform(val, 'yyyy-MM-dd');
      this.dateToControl.patchValue(newDateToVal, { emitEvent: false });
      console.log(this.searchForm.value.dateTo);
    });
  }

  departureDatesFilter = (d: Date): any => {
    let dateFromData;
    this.allFlights.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      dateFromData = data?.dateFrom;
      this.transformDates(dateFromData);
    });
    return this.transformDates(dateFromData).some(
      (el) => el == d?.toDateString()
    );
  };

  returnDatesFilter = (d: Date) => {
    let dateToData;

    this.allFlights.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      dateToData = data?.dateTo;
      this.transformDates(dateToData);
    });
    return this.transformDates(dateToData).some(
      (el) => el == d?.toDateString()
    );
  };

  transformDates(dates) {
    let uniqueDates = [];
    let tempArray = dates;
    uniqueDates = [...new Set(tempArray)];
    uniqueDates = uniqueDates
      .map((i) => new Date(i))
      .map((date) => date?.toDateString());

    return uniqueDates;
  }

  searchFlights() {
    this.submitted = true;
    console.log(this.searchForm);
    if (this.searchForm.valid) {
      this.store.dispatch({
        type: FlightsActionTypes.searchFlights,
        filters: this.searchForm.value,
      });
      this.submitted = false;
    }
    // this.searchForm.reset();
    // this.searchForm.patchValue({ seatType: 'economy' });
  }

  get dateFromControl() {
    return this.searchForm.get('dateFrom');
  }

  get dateToControl() {
    return this.searchForm.get('dateTo');
  }
}
