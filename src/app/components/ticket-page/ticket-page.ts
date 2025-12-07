import { Component, inject, OnInit } from '@angular/core';
import { SelectedSeat } from '../../models/screening.model';
import { BookingRequest, TicketRequest, TicketType, ticketTypes } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaseBooking } from '../helpers/base-booking';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-ticket-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-page.html',
  styleUrl: './ticket-page.scss',
})
export class TicketPage extends BaseBooking implements OnInit {
  private formBuilder = inject(FormBuilder);
  private tokenService = inject(TokenService);
  userForm: any;
  emailInputEnabled: boolean = true;
  prefetchedEmail: string | null = null;

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

    // Init ticket types from state or default to first ticket type
    if (state['seatTicketTypes'] && typeof state['seatTicketTypes'] === 'object') {
      this.seatTicketTypes.set(state['seatTicketTypes']);
    } else {
      const initialTypes: Record<number, TicketType> = {};
      state['selectedSeats'].forEach((seat: SelectedSeat) => {
        initialTypes[seat.id] = ticketTypes[0];
      });
      this.seatTicketTypes.set(initialTypes);
    }

    // Show email if no user
    const tokenExpired = this.tokenService.isAuthTokenExpired();
    console.log(tokenExpired);
    this.emailInputEnabled = tokenExpired;
    // Init user form
    this.userForm = this.formBuilder.group({
      email: [{ value: '', disabled: !this.emailInputEnabled }, [Validators.required, Validators.email]]
    });

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

    // Validate user form
    if (this.emailInputEnabled && this.userForm.invalid) {
      console.warn('Contact form invalid, cannot proceed');
      return;
    }

    // Create booking request dto
    const tickets: TicketRequest[] = Object.entries(this.seatTicketTypes()).map(([seatId, ticketType]) => ({
      seatId: Number(seatId),
      personTypeName: ticketType
    }));

    const emailFromForm = this.userForm && this.userForm.controls ? this.userForm.controls['email']?.value : null;
    const emailToSend = emailFromForm || null;

    const bookingRequest: BookingRequest = {
      screeningId: this.screeningId,
      tickets: tickets,
      email: emailToSend
    };

    this.router.navigate(['/rezerwacja/zamowienie'], {
      state: {
        bookingRequest: bookingRequest,
        selectedSeats: this.selectedSeats(),
        seatTicketTypes: this.seatTicketTypes(),
        user: {
          email: emailToSend
        }
      }
    });
  }

  userFormError(): string | null {
    const c = this.userForm && this.userForm.controls ? this.userForm.controls['email'] : null;
    if (!c) return null;
    if (!c.touched) return null;
    if (c.errors?.['required']) return 'Email is required';
    if (c.errors?.['email']) return 'Invalid email address';
    return null;
  }
}
