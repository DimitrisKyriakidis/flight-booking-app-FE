import { createReducer, on } from '@ngrx/store';
import { initialFlightState } from './flight.state';
import { getAllFlights, getAllFlightsSuccess } from './flights-actions';

export const _flightsReducer = createReducer(
  initialFlightState,
  on(getAllFlights, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getAllFlightsSuccess, (state, action) => {
    let from = action.allFlights.map((flight) => flight.from);
    let to = action.allFlights.map((flight) => flight.to);

    return {
      ...state,
      isLoggedIn: false,
      allFlights: action.allFlights,
      from: [...new Set(from)],
      to: [...new Set(to)],
      dateFrom: action.allFlights.map((flight) => flight.dateFrom),
      dateTo: action.allFlights.map((flight) => flight.dateTo),
    };
  })
);

export function flightsReducer(state, action) {
  return _flightsReducer(state, action);
}
