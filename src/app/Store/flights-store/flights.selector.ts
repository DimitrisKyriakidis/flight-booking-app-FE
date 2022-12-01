import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightState } from './flight.state';

export const flightState = createFeatureSelector<FlightState>('flights');

export const selectAllFlights = createSelector(flightState, (state) => {
  return {
    from: state.from,
    to: state.to,
    dateFrom: state.dateFrom,
    dateTo: state.dateTo,
  };
});

export const selectLoader = createSelector(
  flightState,
  (state) => state.loading
);
