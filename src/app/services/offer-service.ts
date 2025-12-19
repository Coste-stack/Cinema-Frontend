import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private offerApiUrl = this.baseUrl + 'Offer';

  getAll(active: boolean): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.offerApiUrl}?active=${active}`);
  }

  getById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.offerApiUrl}/${id}`);
  }
}
