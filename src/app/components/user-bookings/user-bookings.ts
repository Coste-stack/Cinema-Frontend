import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { UserBooking, UserTicket } from '../../models/booking.model';
import { LoadingService } from '../../services/loading-service';
import { LoadingComponent } from '../loading-component/loading-component';

@Component({
  selector: 'app-user-bookings',
  imports: [LoadingComponent],
  templateUrl: './user-bookings.html',
  styleUrl: './user-bookings.scss',
})
export class UserBookings {
  private bookingService = inject(BookingService);
  userBookings = signal<UserBooking[]>([]);
  error = signal<string | null>(null);

  private loadingService = inject(LoadingService);
  isLoading = (key: string) => this.loadingService.isLoading(key);
  readonly bookingHistoryKey: string = "user-booking-history";

  // Track collapsed (hidden) ticket lists per booking id
  collapsedBookings = signal<Record<number, boolean>>({});

  private getBookingById(bookingId: number): UserBooking | undefined{
    const bookings = this.userBookings();
    const booking = bookings?.find(b => b.id === bookingId);
    return booking;
  }

  private getTicketById(bookingId: number, ticketId: number): UserTicket | undefined{
    const booking = this.getBookingById(bookingId);
    const ticket = booking?.tickets.find(t => t.id === ticketId);
    return ticket;
  }

  getTotalDiscount(bookingId: number): number {
    // From response price
    const subtotal = this.getSubtotalPrice(bookingId);
    const total = this.getTotalPrice(bookingId);
    if (subtotal !== -1 && total !== -1) {
      return Math.max(0, subtotal - total);
    }
    return -1;
  }

  getSubtotalPrice(bookingId: number): number {
    const booking = this.getBookingById(bookingId);
    if (!booking || !booking.basePrice) return -1;
    return booking.basePrice;
  }

  getTotalPrice(bookingId: number): number {
    const booking = this.getBookingById(bookingId);
    if (!booking || !booking.discountedPrice) return -1;
    return booking.discountedPrice;
  }

  getTicketPrice(bookingId: number, ticketId: number): number {
    const ticket = this.getTicketById(bookingId, ticketId);
    if (!ticket || !ticket.totalPrice) return -1;
    return ticket.totalPrice;
  }

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
    this.loadingService.loadingOn(this.bookingHistoryKey);
    this.bookingService.getMyBookings()
    .subscribe({
      next: (response: UserBooking[]) => {
        console.log('UserBookings response: ', response);
        this.loadingService.loadingOff(this.bookingHistoryKey);
        this.userBookings.set(response);
      },
      error: (err) => {
        console.error('Error loading user bookings:', err);
        this.error.set('Failed to load user bookings');
        this.loadingService.loadingOff(this.bookingHistoryKey);
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
    return !this.collapsedBookings()[bookingId];
  }
}
