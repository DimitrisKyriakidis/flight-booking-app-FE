import { createAction, props } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/flight.models';
import { User } from 'src/app/shared/models/user.model';

export const enum FlightsActionTypes {
  getAllFlights = '[Flights] get all flights',
  getAllFlightsSuccess = '[Flights] get all flights success',
  getAllFlightsFail = '[Flights] get all flights fail',

  searchFlights = '[Flights] search flights',
  searchFlightsSuccess = '[Flights] search flights success',
  searchFlightsFail = '[Flights] search flights fail',
}

export const getAllFlights = createAction(FlightsActionTypes.getAllFlights);

export const getAllFlightsSuccess = createAction(
  FlightsActionTypes.getAllFlightsSuccess,
  props<{ allFlights: any[] }>()
);

export const getAllFlightsFail = createAction(
  FlightsActionTypes.getAllFlightsFail,
  props<{ error: string }>()
);
