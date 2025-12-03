import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Screening, Seat } from '../../models/screening.model';
import { Seat as SeatComponent } from '../seat/seat';

@Component({
  selector: 'app-screening-map-display',
  standalone: true,
  imports: [SeatComponent],
  templateUrl: './screening-map-display.html',
  styleUrl: './screening-map-display.scss',
})
export class ScreeningMapDisplay {
  @Input() screening: Screening | null = null;
  @Input() loading: boolean = true;
  @Input() error: string | null = null;
  @Input() selectedSeatIds: number[] = [];
  @Output() seatToggle = new EventEmitter<{ seat: Seat, row: string }>();

  isSeatSelected(seatId: number): boolean {
    return this.selectedSeatIds.includes(seatId);
  }

  onSeatToggle(data: { seat: Seat, row: string }): void {
    this.seatToggle.emit(data);
  }
}
