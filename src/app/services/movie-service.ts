import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5173/Movie';

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  create(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  update(id: number, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
