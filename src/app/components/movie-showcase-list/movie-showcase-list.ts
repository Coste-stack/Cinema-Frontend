import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-showcase-list',
  imports: [],
  templateUrl: './movie-showcase-list.html',
  styleUrl: './movie-showcase-list.scss',
})
export class MovieShowcaseList {
  @Input() movieList: Movie[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;

  trackById(_: number, m: Movie) {
    return m.id;
  }
}
