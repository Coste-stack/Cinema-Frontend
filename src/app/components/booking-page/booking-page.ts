import { Component, OnInit, inject } from '@angular/core';
import { BookingRequest } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking-service';
import { BaseBooking } from '../helpers/base-booking';

@Component({
  selector: 'app-booking-page',
  imports: [CommonModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingPage extends BaseBooking implements OnInit {
  private bookingService = inject(BookingService);

  bookingRequest: BookingRequest | null = null;

  ngOnInit(): void {
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras.state || history.state;

    if (!this.loadStateData(state, ['bookingRequest', 'selectedSeats', 'seatTicketTypes'])) {
      return;
    }

    this.bookingRequest = state['bookingRequest'];
    this.selectedSeats.set(state['selectedSeats']);
    this.seatTicketTypes.set(state['seatTicketTypes']);

    if (!this.validateAndSetScreeningId(this.bookingRequest?.screeningId)) {
      return;
    }

    this.getBulkPrice();
  }

  confirmBooking(): void {
    console.log('Booking request:', this.screeningId);
  }

  reverseBooking(): void {
    // Navigate back to ticket selection page
    if (this.screeningId) {
      this.router.navigate(['/rezerwacja/bilety'], {
        state: {
          screeningId: this.screeningId,
          selectedSeats: this.selectedSeats(),
          seatTicketTypes: this.seatTicketTypes(),
        }
      });
    } else {
      console.error('Cannot navigate back: screeningId is null');
      this.router.navigate(['/repertuar']);
    }
  }

}
