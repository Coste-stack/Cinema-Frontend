import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Seat as SeatModel } from '../../models/screening.model';

@Component({
  selector: 'app-seat',
  imports: [],
  templateUrl: './seat.html',
  styleUrl: './seat.scss',
})
export class Seat {
  @Input() seat!: SeatModel;
  @Input() selected: boolean = false;
  @Input() rowLabel: string = '';
  @Output() toggle = new EventEmitter<{ seat: SeatModel, row: string }>();

  onClick(): void {
    if (this.seat.isAvailable) {
      this.toggle.emit({ seat: this.seat, row: this.rowLabel });
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }
}
