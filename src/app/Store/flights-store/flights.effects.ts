import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { FlightService } from 'src/app/services/flightService';

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

  constructor(
    private flightService: FlightService,
    private actions$: Actions,
    private router: Router,
    private store: Store
  ) {}
}
