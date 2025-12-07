import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, Token } from '../models/auth.model';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private authApiUrl = this.baseUrl + 'Auth';
  authStatusChanged = new Subject<void>();

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/register`, request);
  }

  refreshToken(refreshToken: Token): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/refresh-token`, refreshToken);
  }

  setLocalToken(token: string, expiresAt: Date): void {
    const tokenObj: Token = {
      token: token,
      expiresAt: expiresAt.toISOString(),
    };

    this.tokenService.setAuthToken(tokenObj);
    this.authStatusChanged.next();
  }

  logout(): void {
    this.tokenService.removeAuthToken();
    this.tokenService.removeRefreshToken();
    this.authStatusChanged.next();
  }
}
