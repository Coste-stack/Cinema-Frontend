import { Component, inject, signal } from '@angular/core';
import { Selector } from '../selector/selector';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie.model';
import { MovieScreeningList } from '../movie-screening-list/movie-screening-list';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-repertoire-page',
  imports: [MovieScreeningList, ReactiveFormsModule, Selector],
  templateUrl: './repertoire-page.html',
  styleUrl: './repertoire-page.scss',
})
export class RepertoirePage {
  private movieService = inject(MovieService);

  private loadingService = inject(LoadingService);
  isLoading = (key: string) => this.loadingService.isLoading(key);
  readonly moviesKey: string = "movies";

  error = signal<string | null>(null);

  movieList = signal<Array<Movie>>([]);
  selectedDay = signal<string>('day0');

  days = [
    { value: 'day0', label: 'Dziś', date: this.getDate(0) },
    { value: 'day1', label: 'Jutro', date: this.getDate(1) },
    { value: 'day2', label: this.getDateLabel(2), date: this.getDate(2) },
    { value: 'day3', label: this.getDateLabel(3), date: this.getDate(3) },
    { value: 'day4', label: this.getDateLabel(4), date: this.getDate(4) },
    { value: 'day5', label: this.getDateLabel(5), date: this.getDate(5) },
    { value: 'day6', label: this.getDateLabel(6), date: this.getDate(6) },
  ];

  private getDate(daysFromNow: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
  }

  private getDateLabel(daysFromNow: number): string {
    const date = this.getDate(daysFromNow);
    const dayLabel = date.toLocaleDateString('pl-PL', { weekday: 'short' });
    return dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1, -1); // Remove dot and capitalize first letter
  }

  onDayChange(value: string): void {
    this.selectedDay.set(value);
    const selectedDayData = this.days.find(d => d.value === value);
    console.log('Selected day:', selectedDayData);
    // Filter movies by selected date
    this.loadMovies();
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  private formatScreeningTime(startTime: string): string {
    const date = new Date(startTime);
    return date.toLocaleString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  private formatMovieDates(movies: Movie[]) {
    const selectedDayData = this.days.find(d => d.value === this.selectedDay());
    if (!selectedDayData) return movies;

    const selectedDate = selectedDayData.date;
    const startOfDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    return movies.map(movie => {
      if (movie.screenings) {
        const filteredScreenings = movie.screenings.filter(screening => {
          const screeningDate = new Date(screening.startTime);
          return screeningDate >= startOfDay && screeningDate < endOfDay;
        }).map(screening => ({
          ...screening,
          startTime: this.formatScreeningTime(screening.startTime)
        }));
        return { ...movie, screenings: filteredScreenings };
      }
      return movie;
    }).filter(movie => movie.screenings && movie.screenings.length > 0);
  }

  private loadMovies(): void {
    this.loadingService.loadingOn(this.moviesKey);
    this.error.set(null);

    this.movieService.getAll(true)
      .subscribe({
        next: (movies) => {
          console.log('Successfully received movies');
          //console.log('Observable emitted the next value: ' + JSON.stringify(movies));
          const filteredMovies = this.formatMovieDates(movies);
          this.movieList.set(filteredMovies);
          this.loadingService.loadingOff(this.moviesKey);
        },
        error: (err) => {
          this.error.set('Failed to load movies');
          this.loadingService.loadingOff(this.moviesKey);
          console.error('Error loading movies:', err);
        }
      }
    );
  }
}
