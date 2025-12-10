import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/ticket.model';
import { PayuRequest, PayuResponse } from '../models/payu.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private bookingApiUrl = this.baseUrl + 'Booking';
  private payuApiUrl = this.baseUrl + 'payu';

  initiateBooking(request: BookingRequest): Observable<number> {
    return this.http.post<number>(`${this.bookingApiUrl}/initiate`, request);
  }

  payBooking(request: PayuRequest): Observable<PayuResponse> {
    return this.http.post<PayuResponse>(`${this.payuApiUrl}/order`, request);
  }
}
