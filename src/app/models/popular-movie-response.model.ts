import { Movie } from "./movie.model";

export interface PopularMovieResponse {
  movie: Movie;
  ticketsSold: number;
}
