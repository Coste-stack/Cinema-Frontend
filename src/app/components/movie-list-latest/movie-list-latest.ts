import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieList } from '../movie-list/movie-list';

@Component({
  selector: 'app-movie-list-latest',
  imports: [MovieList],
  templateUrl: './movie-list-latest.html',
  styleUrl: './movie-list-latest.scss',
})
export class MovieListLatest implements OnInit {
  private movieService = inject(MovieService);
  movieList = signal<Array<Movie>>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading.set(true);
    this.error.set(null);

    this.movieService.getLatest()
      .subscribe({
        next: (movies) => {
          console.log('Observable emitted the next value: ' + JSON.stringify(movies));
          this.movieList.set(movies);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load movies');
          this.loading.set(false);
          console.error('Error loading movies:', err);
        }
      }
    );
  }
}
