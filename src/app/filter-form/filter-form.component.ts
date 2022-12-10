import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { datesRangeValidator } from '../shared/validators/datesValidator';
import {
  FlightsActionTypes,
  getAllFlights,
} from '../Store/flights-store/flights-actions';
import { selectAllFlights } from '../Store/flights-store/flights.selector';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit, OnDestroy {
  loading: Observable<boolean>;

  searchForm: FormGroup;

  submitted: boolean = false;

  allFlights: Observable<{
    from: string[];
    to: string[];
    dateFrom: string[];
    dateTo: any[];
  }>;

  @Input()
  resultsPageActive: boolean = false;

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
        from: new FormControl(null, [Validators.required]),
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
    });

    this.dateToControl.valueChanges.subscribe((val) => {
      const newDateToVal = this.datePipe.transform(val, 'yyyy-MM-dd');
      this.dateToControl.patchValue(newDateToVal, { emitEvent: false });
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
    if (this.searchForm.valid) {
      this.store.dispatch({
        type: FlightsActionTypes.searchFlights,
        filters: this.searchForm.value,
      });

      this.submitted = false;
    }
  }

  get dateFromControl() {
    return this.searchForm.get('dateFrom');
  }

  get dateToControl() {
    return this.searchForm.get('dateTo');
  }
}
