import { Component } from '@angular/core';
import { MovieListPopular } from "../movie-list-popular/movie-list-popular";
import { MovieListLatest } from "../movie-list-latest/movie-list-latest";

@Component({
  selector: 'app-main-page',
  imports: [MovieListPopular, MovieListLatest],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
