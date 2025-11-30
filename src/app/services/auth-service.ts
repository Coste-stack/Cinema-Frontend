import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestDTO, LoginResponseDTO, RegisterRequestDTO } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private authApiUrl = this.baseUrl + 'Auth';

  login(request: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.authApiUrl}/login`, request);
  }

  register(request: RegisterRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.authApiUrl}/register`, request);
  }
}
