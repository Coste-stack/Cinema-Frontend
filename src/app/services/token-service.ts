import { Injectable } from '@angular/core';
import { Token } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private AUTH_TOKEN_KEY = 'auth_token';
  private REFRESH_TOKEN_KEY = 'refresh_token';

  public setAuthToken(token: Token): void {
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, JSON.stringify(token));
  }

  public setRefreshToken(token: Token): void {
    sessionStorage.setItem(this.REFRESH_TOKEN_KEY, JSON.stringify(token));
  }

  public getAuthToken(): Token | null {
    const item = sessionStorage.getItem(this.AUTH_TOKEN_KEY);
    return item ? JSON.parse(item) : null;
  }

  public getRefreshToken(): Token | null {
    const item = sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    return item ? JSON.parse(item) : null;
  }

  public removeAuthToken(): void {
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  public removeRefreshToken(): void {
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public isAuthTokenExpired(): boolean {
    const token = this.getAuthToken();
    return !token || new Date(token.expiresAt).getTime() <= Date.now();
  }
}
