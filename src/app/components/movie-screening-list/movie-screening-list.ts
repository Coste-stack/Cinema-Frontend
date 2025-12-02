import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-screening-list',
  imports: [],
  templateUrl: './movie-screening-list.html',
  styleUrl: './movie-screening-list.scss',
})
export class MovieScreeningList {
  @Input() movieList: Movie[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;

  trackById(_: number, m: Movie) {
    return m.id;
  }
}
