import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private bookingApiUrl = this.baseUrl + 'Booking';

  initiateBooking(request: BookingRequest): Observable<number> {
    return this.http.post<number>(`${this.bookingApiUrl}/initiate`, request);
  }
}
