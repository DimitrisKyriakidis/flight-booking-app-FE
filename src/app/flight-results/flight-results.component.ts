import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightsActionTypes } from '../Store/flights-store/flights-actions';
import { selectFilteredFlights } from '../Store/flights-store/flights.selector';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
})
export class FlightResultsComponent implements OnInit {
  filteredFlights: Observable<any[]>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const filters = {
      from: this.activatedRoute.snapshot.paramMap.get('from'),
      to: this.activatedRoute.snapshot.paramMap.get('to'),
      dateFrom: this.activatedRoute.snapshot.paramMap.get('dateFrom'),
      dateTo: this.activatedRoute.snapshot.paramMap.get('dateTo'),
      seatType: this.activatedRoute.snapshot.paramMap.get('seatType'),
      passengers: Number(
        this.activatedRoute.snapshot.paramMap.get('passengers')
      ),
    };
    this.store.dispatch({
      type: FlightsActionTypes.searchFlights,
      filters: filters,
    });
    this.filteredFlights = this.store.select(selectFilteredFlights);

    this.filteredFlights.subscribe((data) => {
      console.log(data);
    });

    console.log('filtersFromRoute=', filters);
  }
}
