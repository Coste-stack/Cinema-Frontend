import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedSeat } from '../../models/screening.model';
import { TicketType, ticketTypes } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingPage implements OnInit  {
  private router = inject(Router);

  selectedSeats = signal<SelectedSeat[]>([]);
  screeningId: number | null = null;
  seatTicketTypes = signal<Map<number, TicketType>>(new Map());
  availableTicketTypes: TicketType[] = [...ticketTypes];

  ngOnInit(): void {
    // Get data passed via navigation state
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras.state || history.state;

    if (state && state['selectedSeats'] && state['screeningId']) {
      this.selectedSeats.set(state['selectedSeats']);
      this.screeningId = state['screeningId'];
      // Initialize ticket types to default ticketType for all seats
      const initialTypes = new Map<number, TicketType>();
      state['selectedSeats'].forEach((seat: SelectedSeat) => {
        initialTypes.set(seat.id, ticketTypes[0]);
      });
      this.seatTicketTypes.set(initialTypes);
    } else {
      // If no data, redirect back to repertoire
      this.router.navigate(['/repertuar']);
    }
  }

  getTicketType(seatId: number): TicketType {
    return this.seatTicketTypes().get(seatId) || ticketTypes[0];
  }

  onTicketTypeChange(seatId: number, type: TicketType): void {
    const updatedTypes = new Map(this.seatTicketTypes());
    updatedTypes.set(seatId, type);
    this.seatTicketTypes.set(updatedTypes);
  }

  confirmBooking(): void {
    console.log('Confirming booking for seats:', this.selectedSeats());
    console.log('Ticket types:', Array.from(this.seatTicketTypes().entries()));
    console.log('Screening ID:', this.screeningId);
  }

  cancelBooking(): void {
    // Navigate back to screening page
    if (this.screeningId) {
      this.router.navigate(['/repertuar', this.screeningId]);
    } else {
      this.router.navigate(['/repertuar']);
    }
  }
}
