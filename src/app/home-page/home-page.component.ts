import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';

import { Flight } from '../shared/models/flight.models';
import { getAllFlights } from '../Store/flights-store/flights-actions';
import { selectAllFlights } from '../Store/flights-store/flights.selector';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  loading: Observable<boolean>;
  searchForm: FormGroup;
  myFilter: any;

  allFlights: Observable<{
    from: string[];
    to: string[];
    dateFrom: string[];
    dateTo: any[];
  }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllFlights());
    this.initForm();
    this.allFlights = this.store.select(selectAllFlights);
  }

  initForm() {
    this.searchForm = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      dateFrom: new FormControl(null, [Validators.required]),
      dateTo: new FormControl(null, [Validators.required]),
      seats: new FormControl('economy', [Validators.required]),
      passengers: new FormControl(null, [Validators.required]),
    });
  }
}
