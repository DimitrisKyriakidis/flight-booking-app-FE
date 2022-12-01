import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightService {
  public apiUrl = '/api/flights';

  constructor(private http: HttpClient) {}

  getAllFlights() {
    return this.http.get(`${this.apiUrl}/getAllFlights`);
  }
}
