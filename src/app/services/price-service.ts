import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketBulkPriceRequest, TicketBulkPriceResponse } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private priceApiUrl = this.baseUrl + 'Price';

  getBulkPrice(request: TicketBulkPriceRequest): Observable<TicketBulkPriceResponse> {
    return this.http.post<TicketBulkPriceResponse>(
      `${this.priceApiUrl}/calculate-bulk`,
      request
    );
  }
}
