import { Flight } from 'src/app/shared/models/flight.models';

export interface FlightState {
  allFlights: Flight[];
  from: string[];
  to: string[];
  dateFrom: string[];
  dateTo: string[];
  loading: boolean;
  filteredFlights: [];
}

export const initialFlightState: FlightState = {
  allFlights: [],
  loading: false,
  from: [],
  to: [],
  dateFrom: [],
  dateTo: [],
  filteredFlights: [],
};
