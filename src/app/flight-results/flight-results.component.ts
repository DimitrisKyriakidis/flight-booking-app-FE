import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { FlightsActionTypes } from '../Store/flights-store/flights-actions';
import { selectFilteredFlights } from '../Store/flights-store/flights.selector';

@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
})
export class FlightResultsComponent implements OnInit, AfterViewInit {
  filteredFlights: Observable<any[]>;

  filters = {};

  @ViewChild('filterForm', { static: false })
  filterComponent: FilterFormComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filters = {
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
      filters: this.filters,
    });
    this.filteredFlights = this.store.select(selectFilteredFlights);
  }
  ngAfterViewInit(): void {
    console.log('filterComponent=', this.filterComponent);
    this.filterComponent.searchForm.setValue(this.filters);
    this.filteredFlights.subscribe((data) => {
      console.log(data);
    });
    this.changeDetector.detectChanges();
  }
}
