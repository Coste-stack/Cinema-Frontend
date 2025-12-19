import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieShowcaseList } from '../movie-showcase-list/movie-showcase-list';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-movie-list-latest',
  imports: [MovieShowcaseList],
  templateUrl: './movie-list-latest.html',
  styleUrl: './movie-list-latest.scss',
})
export class MovieListLatest implements OnInit {
  private movieService = inject(MovieService);
  movieList = signal<Array<Movie>>([]);
  error = signal<string | null>(null);

  private loadingService = inject(LoadingService);
  isLoading = (key: string) => this.loadingService.isLoading(key);
  readonly moviesKey: string = "popular-movies";

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loadingService.loadingOn(this.moviesKey);
    this.error.set(null);

    this.movieService.getLatest()
      .subscribe({
        next: (movies) => {
          console.log('Observable emitted the next value: ' + JSON.stringify(movies));
          this.movieList.set(movies);
          this.loadingService.loadingOn(this.moviesKey);
        },
        error: (err) => {
          this.error.set('Failed to load movies');
          this.loadingService.loadingOff(this.moviesKey);
          console.error('Error loading movies:', err);
        }
      }
    );
  }
}
