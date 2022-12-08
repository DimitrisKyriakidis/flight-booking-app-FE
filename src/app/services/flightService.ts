import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightService {
  public apiUrl = '/api/flights';

  constructor(private http: HttpClient) {}

  getAllFlights() {
    return this.http.get(`${this.apiUrl}/getAllFlights`);
  }

  searchFlights(
    from,
    to,
    dateFrom,
    dateTo,
    seatType,
    passengers,
    sortColValue?,
    sortOrderValue?
  ) {
    return this.http.post(
      `${this.apiUrl}/searchFlights?sortCol=${sortColValue}&sortOrder=${sortOrderValue}`,
      {
        from,
        to,
        dateFrom,
        dateTo,
        seatType,
        passengers,
      }
    );
  }

  saveFlight(flight: {}) {
    //const reqBody = { filters: filters, passengers: passengers };
    return this.http.post(`${this.apiUrl}/saveFlight`, flight);
  }
}
