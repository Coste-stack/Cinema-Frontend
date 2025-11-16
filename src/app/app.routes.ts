import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';

export const routes: Routes = [
  { path: '', component: MovieList },
  { path: 'repertuar', component: MovieList },
];
