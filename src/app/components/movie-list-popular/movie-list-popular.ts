import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieShowcaseList } from '../movie-showcase-list/movie-showcase-list';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-movie-list-popular',
  imports: [MovieShowcaseList],
  templateUrl: './movie-list-popular.html',
  styleUrl: './movie-list-popular.scss',
})
export class MovieListPopular implements OnInit {
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

    this.movieService.getPopular()
      .subscribe({
        next: (response) => {
          const movies: Movie[] = response.map(item => item.movie);
          console.log('Observable emitted the next value: ' + JSON.stringify(movies));
          this.movieList.set(movies);
          this.loadingService.loadingOff(this.moviesKey);
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
