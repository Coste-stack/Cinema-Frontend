import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from '../models/screening.model';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private screeningApiUrl = this.baseUrl + 'Screening';

  getSeatMap(id: number): Observable<Screening> {
    return this.http.get<Screening>(`${this.screeningApiUrl}/${id}/seat-map`);
  }
}
