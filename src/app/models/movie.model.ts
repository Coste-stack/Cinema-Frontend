export interface Movie {
  id: number;
  title: string;
  description?: string;
  duration: number;
  basePrice: number;
  genres: Genre[];
  rating?: MovieRating;
  releaseDate?: string;
  screenings?: ScreeningMovie[];
}

export interface ScreeningMovie {
  id: number;
  movieId: number;
  startTime: string;
  endTime: string;
}

export interface Genre {
  id: number;
  name: string;
}

export enum MovieRating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG13',
  R = 'R',
  NC17 = 'NC17'
}
