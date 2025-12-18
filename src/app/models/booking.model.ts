import { Genre, MovieRating } from "./movie.model";

export interface UserBooking {
  id: number;
  basePrice: number;
  discountedPrice: number;
  tickets: UserTicket[];
  screening: UserScreening;
}

export interface UserTicket {
  id: number;
  totalPrice: number;
  personType: string;
  seat: UserSeat;
}

export interface UserSeat {
  id: number;
  row: string;
  number: string;
  seatType: string;
}

export interface UserScreening {
  id: number;
  startTime: Date;
  endTime: Date;
  projectionType: string;
  language?: string;
  movie: UserMovie;
}

export interface UserMovie {
  id: number;
  title: string;
  description?: string;
  genres: Genre[];
  rating?: MovieRating;
  releaseDate?: string;
}
