import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreeningService } from '../../services/screening-service';
import { Screening, SelectedSeat } from '../../models/screening.model';
import { ScreeningMapDisplay } from '../screening-map-display/screening-map-display';

@Component({
  selector: 'app-screening-page',
  standalone: true,
  imports: [ScreeningMapDisplay],
  templateUrl: './screening-page.html',
  styleUrl: './screening-page.scss',
})
export class ScreeningPage implements OnInit {
  private route = inject(ActivatedRoute);
  private screeningService = inject(ScreeningService);
  screening = signal<Screening | null>(null);
  selectedSeats = signal<SelectedSeat[]>([]);
  selectedSeatIds = computed(() => this.selectedSeats().map(s => s.id));
  groupedSelectedSeats = computed(() => {
    const seats = this.selectedSeats();
    const grouped = new Map<string, number[]>();

    seats.forEach(seat => {
      if (!grouped.has(seat.row)) {
        grouped.set(seat.row, []);
      }
      grouped.get(seat.row)!.push(seat.number);
    });

    // Sort seat numbers within each row
    grouped.forEach((numbers, row) => {
      numbers.sort((a, b) => a - b);
    });

    return Array.from(grouped.entries()).map(([row, numbers]) => ({
      row,
      numbers
    }));
  });

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private id: number = -1;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : -1;
    console.log(this.id);
    this.loadSeatMap();
  }

  onSeatToggle(data: { seat: any, row: string }): void {
    const current = this.selectedSeats();
    const exists = current.find(s => s.id === data.seat.id);

    if (exists) {
      // Remove seat from selection
      this.selectedSeats.set(current.filter(s => s.id !== data.seat.id));
    } else {
      // Add seat to selection
      const newSeat: SelectedSeat = {
        id: data.seat.id,
        row: data.row,
        number: data.seat.number
      };
      this.selectedSeats.set([...current, newSeat]);
    }
  }

  isSeatSelected(seatId: number): boolean {
    return this.selectedSeats().some(s => s.id === seatId);
  }

  private loadSeatMap(): void {
    this.loading.set(true);
    this.error.set(null);

    this.screeningService.getSeatMap(this.id)
      .subscribe({
        next: (screening) => {
          console.log('Successfully received screening seat map');
          console.log('Observable emitted the next value: ' + JSON.stringify(screening));
          this.screening.set(screening);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load screening');
          this.loading.set(false);
          console.error('Error loading screening:', err);
        }
      }
    );
  }
}
