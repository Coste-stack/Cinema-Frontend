import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { PopularMovieResponse } from '../models/popular-movie-response.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:8080/';
  private movieApiUrl = this.baseUrl + 'Movie';
  private statisticsApiUrl = this.baseUrl + 'Statistics';

  getAll(full?: Boolean): Observable<Movie[]> {
    const effectiveFull = full ?? false;
    return this.http.get<Movie[]>(`${this.movieApiUrl}?full=${effectiveFull}`);
  }

  getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieApiUrl}/${id}`);
  }

  getPopular(top?: string): Observable<PopularMovieResponse[]> {
    const url = `${this.statisticsApiUrl}/popular-movies${top ? `?top=${top}` : ''}`;
    return this.http.get<PopularMovieResponse[]>(url);
  }

  getLatest(days?: string): Observable<Movie[]> {
    const url = `${this.statisticsApiUrl}/latest-movies${days ? `?days=${days}` : ''}`;
    return this.http.get<Movie[]>(url);
  }
}
