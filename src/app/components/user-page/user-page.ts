import { Component, signal } from '@angular/core';
import { UserBookings } from "../user-bookings/user-bookings";
import { UserSettings } from "../user-settings/user-settings";

const USER_PAGE_STATES = ['settings', 'booking-history'] as const;
type UserPageState = typeof USER_PAGE_STATES[number];

@Component({
  selector: 'app-user-page',
  imports: [UserBookings, UserSettings],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage {
  userPageState = signal<UserPageState>(USER_PAGE_STATES[0]);

  setState(state: UserPageState) {
    this.userPageState.set(state);
  }
}
