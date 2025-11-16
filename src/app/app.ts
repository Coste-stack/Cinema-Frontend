import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CinemaApp');
}
