import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedSeat } from '../../models/screening.model';
import { TicketBulkPriceRequest, TicketBulkPriceResponse, TicketPriceRequest, TicketType, ticketTypes } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { PriceService } from '../../services/price-service';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingPage implements OnInit  {
  private router = inject(Router);
  private priceService = inject(PriceService);

  selectedSeats = signal<SelectedSeat[]>([]);
  screeningId: number | null = null;
  seatTicketTypes = signal<Map<number, TicketType>>(new Map());
  availableTicketTypes: TicketType[] = [...ticketTypes];
  ticketsPrice: TicketBulkPriceResponse | null = null;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

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
      this.getBulkPrice();
    } else {
      // If no data, redirect back to repertoire
      this.router.navigate(['/repertuar']);
    }
  }

  onTicketTypeChange(seatId: number, type: TicketType): void {
    const updatedTypes = new Map(this.seatTicketTypes());
    updatedTypes.set(seatId, type);
    this.seatTicketTypes.set(updatedTypes);
    this.getBulkPrice();
  }

  getTicketType(seatId: number): TicketType {
    return this.seatTicketTypes().get(seatId) || ticketTypes[0];
  }

  getPrice(seatId: number): number {
    if (this.ticketsPrice === null || !this.ticketsPrice.ticketPrices) {
      return -1;
    }
    const ticket = this.ticketsPrice.ticketPrices.find(t => t.seatId === seatId);
    return ticket ? ticket.price : -1;
  }

  getTotalPrice(): number {
    if (this.ticketsPrice === null || !this.ticketsPrice.ticketPrices) {
      return -1;
    }
    const price = this.ticketsPrice.totalPrice;
    return price ?? -1;
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

  private getBulkPrice(): void {
    this.loading.set(true);
    this.error.set(null);

    if (this.screeningId === null) {
      this.screeningId = -1;
    }

    // Build tickets array from the current signal value
    const tickets: TicketPriceRequest[] = this.selectedSeats().map((seat: SelectedSeat) => ({
      seatId: seat.id,
      personTypeName: this.getTicketType(seat.id),
    }));

    const ticketBulkPriceRequest: TicketBulkPriceRequest = {
      screeningId: this.screeningId,
      tickets: tickets,
    };

    this.priceService.getBulkPrice(ticketBulkPriceRequest)
      .subscribe({
        next: (response) => {
          console.log('Successfully received bulk price response:', response);
          this.ticketsPrice = response;
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load bulk price');
          this.loading.set(false);
          console.error('Error loading bulk price:', err);
        }
      });
  }
}
