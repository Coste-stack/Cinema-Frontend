import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private userApiUrl = this.baseUrl + 'User';

  getEmail(): Observable<string> {
    return this.http.get(`${this.userApiUrl}/current-email`, { responseType: 'text' });
  }

  changePassword(password: string): Observable<void> {
    return this.http.put<void>(`${this.userApiUrl}/password`,
      JSON.stringify(password),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
