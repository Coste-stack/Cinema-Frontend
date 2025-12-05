import { Component, OnInit } from '@angular/core';
import { SelectedSeat } from '../../models/screening.model';
import { BookingRequest, TicketRequest, TicketType, ticketTypes } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { BaseBooking } from '../helpers/base-booking';

@Component({
  selector: 'app-ticket-page',
  imports: [CommonModule],
  templateUrl: './ticket-page.html',
  styleUrl: './ticket-page.scss',
})
export class TicketPage extends BaseBooking implements OnInit {
  availableTicketTypes: TicketType[] = [...ticketTypes];

  ngOnInit(): void {
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras.state || history.state;

    if (!this.loadStateData(state, ['selectedSeats', 'screeningId'])) {
      return;
    }

    if (!this.validateAndSetScreeningId(state['screeningId'])) {
      return;
    }

    this.selectedSeats.set(state['selectedSeats']);

    // Initialize ticket types from state or default to first ticket type
    if (state['seatTicketTypes'] && typeof state['seatTicketTypes'] === 'object') {
      this.seatTicketTypes.set(state['seatTicketTypes']);
    } else {
      const initialTypes: Record<number, TicketType> = {};
      state['selectedSeats'].forEach((seat: SelectedSeat) => {
        initialTypes[seat.id] = ticketTypes[0];
      });
      this.seatTicketTypes.set(initialTypes);
    }

    this.getBulkPrice();
  }

  onTicketTypeChange(seatId: number, type: TicketType): void {
    const updatedTypes = { ...this.seatTicketTypes() };
    updatedTypes[seatId] = type;
    this.seatTicketTypes.set(updatedTypes);
    this.getBulkPrice();
  }

  confirmBooking(): void {
    console.log('Confirming booking for seats:', this.selectedSeats());
    console.log('Ticket types:', this.seatTicketTypes());
    console.log('Screening ID:', this.screeningId);

    if (Object.keys(this.seatTicketTypes()).length === 0) {
      console.log('No tickets present for screening:', this.screeningId);
      return;
    }

    if (this.screeningId === null) {
      console.error("Cannot confirm booking: screeningId is null");
      return;
    }

    // Create booking request dto
    const tickets: TicketRequest[] = Object.entries(this.seatTicketTypes()).map(([seatId, ticketType]) => ({
      seatId: Number(seatId),
      personTypeName: ticketType
    }));

    const bookingRequest: BookingRequest = {
      screeningId: this.screeningId,
      tickets: tickets
    };

    this.router.navigate(['/rezerwacja/zamowienie'], {
      state: {
        bookingRequest: bookingRequest,
        selectedSeats: this.selectedSeats(),
        seatTicketTypes: this.seatTicketTypes()
      }
    });
  }

}
