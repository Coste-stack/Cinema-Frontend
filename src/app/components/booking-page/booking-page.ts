import { Component, OnInit, inject } from '@angular/core';
import { BookingRequest } from '../../models/ticket.model';

import { BookingService } from '../../services/booking-service';
import { BaseBooking } from '../helpers/base-booking';
import { finalize, Observable, tap, throwError } from 'rxjs';
import { PayuRequest } from '../../models/payu.model';

@Component({
  selector: 'app-booking-page',
  imports: [],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.scss',
})
export class BookingPage extends BaseBooking implements OnInit {
  private bookingService = inject(BookingService);

  bookingRequest: BookingRequest | null = null;
  bookingId: number | null = null;
  userEmail: string | null = null;

  ngOnInit(): void {
    const navigation = this.router.currentNavigation();
    const state = navigation?.extras.state || history.state;

    if (!this.loadStateData(state, ['bookingRequest', 'selectedSeats', 'seatTicketTypes'])) {
      return;
    }

    this.bookingRequest = state['bookingRequest'];
    this.selectedSeats.set(state['selectedSeats']);
    this.seatTicketTypes.set(state['seatTicketTypes']);
    this.userEmail = state['user']?.email ?? null;

    if (!this.validateAndSetScreeningId(this.bookingRequest?.screeningId)) {
      return;
    }

    this.getBulkPrice();
  }

  confirmBooking(): void {
    console.log('Booking request:', this.screeningId);
    this.initiateBooking().subscribe({
      next: () => {
        this.payBooking();
      },
      error: (err) => {
        this.router.navigate(['/rezerwacja/blad'], {
          state: { error: err.message }
        });
      }
    });
  }

  payBooking(): void {
    if (this.bookingId === null) {
      console.error('Cannot initiate pay booking: ', 'Booking Id is null');
      return;
    }
    const bookingId: number = this.bookingId;
    const request: PayuRequest = { BookingId: bookingId };
    console.log('PayU request:', request);
    this.bookingService.payBooking(request).subscribe({
      next: (response) => {
        const url: string = response.redirectUri;
        window.open(url, '_blank');
      },
      error: (err) => {
        this.router.navigate(['/rezerwacja/blad'], {
          state: { error: err.message }
        });
      }
    });
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

  private initiateBooking(): Observable<number> {
    this.loading.set(true);
    this.error.set(null);

    if (this.bookingRequest === null) {
      console.error('Cannot initiate booking: ', 'Booking request is null')
      return throwError(() => new Error('Booking request is null'));
    }

    return this.bookingService.initiateBooking(this.bookingRequest).pipe(
      tap({
        next: (responseBookingId) => {
          console.log('Successfully received initiate booking response:', responseBookingId);
          this.bookingId = responseBookingId;
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to initiate booking');
          this.loading.set(false);
          console.error('Error loading initiate booking:', err);
        }
      }),
      finalize(() => this.loading.set(false))
    )
  }
}
