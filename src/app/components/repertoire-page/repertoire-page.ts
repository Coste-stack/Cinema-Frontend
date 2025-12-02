import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieScreeningList } from '../movie-screening-list/movie-screening-list';

@Component({
  selector: 'app-repertoire-page',
  imports: [MovieScreeningList],
  templateUrl: './repertoire-page.html',
  styleUrl: './repertoire-page.scss',
})
export class RepertoirePage {
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

    this.movieService.getAll()
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
