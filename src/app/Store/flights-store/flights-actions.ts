import { createAction, props } from '@ngrx/store';
import { Flight } from 'src/app/shared/models/flight.models';
import { SearchFlightFilters } from 'src/app/shared/models/searchFlightFilters';

export const enum FlightsActionTypes {
  getAllFlights = '[Flights] get all flights',
  getAllFlightsSuccess = '[Flights] get all flights success',
  getAllFlightsFail = '[Flights] get all flights fail',

  searchFlights = '[Flights] search flights',
  searchFlightsSuccess = '[Flights] search flights success',
  searchFlightsFail = '[Flights] search flights fail',

  saveFlight = '[Flights] save flight',
  saveFlightSuccess = '[Flights] save flight success',
  saveFlightFail = '[Flights] save flight fail',
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

export const searchFlights = createAction(
  FlightsActionTypes.searchFlights,
  props<{
    filters: SearchFlightFilters;
  }>()
);

export const searchFlightsSuccess = createAction(
  FlightsActionTypes.searchFlightsSuccess,
  props<{ filteredFlights: any[] }>()
);

export const searchFlightsFlightsFail = createAction(
  FlightsActionTypes.searchFlightsFail,
  props<{ error: string }>()
);

export const saveFlight = createAction(
  FlightsActionTypes.saveFlight,
  props<{
    flight: {};
    // filters: {};
    // passengers: [];
  }>()
);

export const saveFlightSuccess = createAction(
  FlightsActionTypes.saveFlightSuccess
);

export const saveFlightFail = createAction(
  FlightsActionTypes.saveFlightFail,
  props<{ error: string }>()
);
