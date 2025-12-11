import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { UserBooking } from '../../models/booking.model';

@Component({
  selector: 'app-user-page',
  imports: [],
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss', './user-bookings.scss'],
})
export class UserPage {
  private bookingService = inject(BookingService);
  userBookings = signal<UserBooking[]>([]);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Track collapsed (hidden) ticket lists per booking id
  collapsedBookings = signal<Record<number, boolean>>({});

  ngOnInit() {
    this.getUserBookings();
  }

  totalBookingPrice(bookingId: number): number {
    const bookings = this.userBookings();
    if (!bookings || bookings.length === 0) return 0;
    let booking = bookings.find(b => b.id === bookingId);
    if (!booking || !booking.tickets) return 0;
    return booking.tickets.reduce((acc, t) => acc + (t.totalPrice ?? 0), 0);
  }

  getUserBookings(): void {
    console.log('UserBookings request');
    this.bookingService.getMyBookings()
    .subscribe({
      next: (response: UserBooking[]) => {
        console.log('UserBookings response: ', response);
        this.userBookings.set(response);
      },
      error: (err) => {
          this.error.set('Failed to load user bookings');
          this.loading.set(false);
          console.error('Error loading user bookings:', err);
      }
    });
  }

  toggleTickets(bookingId: number): void {
    const current = this.collapsedBookings();
    const next = { ...current };
    next[bookingId] = !next[bookingId];
    this.collapsedBookings.set(next);
  }

  isCollapsed(bookingId: number): boolean {
    return !!this.collapsedBookings()[bookingId];
  }
}
