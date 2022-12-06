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
export class HomePageComponent implements OnInit {
  constructor(private store: Store, private datePipe: DatePipe) {}

  ngOnInit(): void {}
}
