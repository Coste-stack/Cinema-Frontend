import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, Token } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private authApiUrl = this.baseUrl + 'Auth';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/register`, request);
  }

  refreshToken(refreshToken: Token): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/refresh-token`, refreshToken);
  }
}
