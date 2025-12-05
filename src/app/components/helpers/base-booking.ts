import { inject, signal, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedSeat } from '../../models/screening.model';
import { TicketBulkPriceRequest, TicketBulkPriceResponse, TicketPriceRequest, TicketType, ticketTypes } from '../../models/ticket.model';
import { PriceService } from '../../services/price-service';

@Directive()
export abstract class BaseBooking {
  protected router = inject(Router);
  protected priceService = inject(PriceService);

  selectedSeats = signal<SelectedSeat[]>([]);
  screeningId: number | null = null;
  seatTicketTypes = signal<Record<number, TicketType>>({});
  ticketsPrice: TicketBulkPriceResponse | null = null;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  protected loadStateData(state: any, requiredFields: string[]): boolean {
    if (!state) {
      console.error('No state data provided');
      this.router.navigate(['/repertuar']);
      return false;
    }

    // Check all required fields
    const missingFields = requiredFields.filter(field => !state[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      this.router.navigate(['/repertuar']);
      return false;
    }

    return true;
  }

  protected validateAndSetScreeningId(id: any): boolean {
    const parsedId = Number(id);
    if (!Number.isFinite(parsedId) || parsedId <= 0) {
      console.error('Invalid screeningId:', id);
      this.router.navigate(['/repertuar']);
      return false;
    }
    this.screeningId = parsedId;
    return true;
  }

  getTicketType(seatId: number): TicketType {
    return this.seatTicketTypes()[seatId] || ticketTypes[0];
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
    return this.ticketsPrice.totalPrice ?? -1;
  }

  cancelBooking(): void {
    if (this.screeningId) {
      this.router.navigate(['/repertuar', this.screeningId]);
    } else {
      this.router.navigate(['/repertuar']);
    }
  }

  protected getBulkPrice(): void {
    this.loading.set(true);
    this.error.set(null);

    if (this.screeningId === null) {
      console.error('Cannot get price for tickets: screeningId is null');
      this.loading.set(false);
      return;
    }

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
