import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { FlightService } from 'src/app/services/flightService';
import { SearchFlightFilters } from 'src/app/shared/models/searchFlightFilters';

import { FlightsActionTypes } from './flights-actions';

@Injectable()
export class FlightsEffects {
  getAllFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FlightsActionTypes.getAllFlights),
      mergeMap(() =>
        this.flightService.getAllFlights().pipe(
          map((response) => {
            return {
              type: FlightsActionTypes.getAllFlightsSuccess,
              allFlights: response['data'],
            };
          }),
          catchError(() => {
            return of({ type: FlightsActionTypes.getAllFlightsFail });
          })
        )
      )
    );
  });

  searchFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FlightsActionTypes.searchFlights),
      mergeMap((payload: SearchFlightFilters) =>
        this.flightService
          .searchFlights(
            payload.filters.from,
            payload.filters.to,
            payload.filters.dateFrom,
            payload.filters.dateTo,
            payload.filters.seatType,
            payload.filters.passengers
          )
          .pipe(
            map((response) => {
              console.log('filteredFlightsResponse=', response);
              this.router.navigate([
                `/flight-results/${payload.filters.from}/${payload.filters.to}/${payload.filters.dateFrom}/${payload.filters.dateTo}/${payload.filters.seatType}/${payload.filters.passengers}`,
              ]);

              return {
                type: FlightsActionTypes.searchFlightsSuccess,
                filteredFlights: response['data'],
              };
            }),
            catchError(() => {
              return of({ type: FlightsActionTypes.searchFlightsFail });
            })
          )
      )
    );
  });

  constructor(
    private flightService: FlightService,
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}
}
