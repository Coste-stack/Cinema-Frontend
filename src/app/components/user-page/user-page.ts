import { Component, signal } from '@angular/core';
import { UserBookings } from "../user-bookings/user-bookings";
import { UserSettings } from "../user-settings/user-settings";
import { Selector } from '../selector/selector';

const USER_PAGE_STATES = ['settings', 'booking-history'] as const;
type UserPageState = typeof USER_PAGE_STATES[number];

@Component({
  selector: 'app-user-page',
  imports: [UserBookings, UserSettings, Selector],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage {
  userPageState = signal<UserPageState>(USER_PAGE_STATES[0]);
  selectedSection = signal<string>('settings');

  sections = [
    { value: USER_PAGE_STATES[0], label: 'Settings' },
    { value: USER_PAGE_STATES[1], label: 'Booking History' }
  ];

  onSectionChange(value: string): void {
    console.log(value);

    if (USER_PAGE_STATES.includes(value as UserPageState)) {
      this.selectedSection.set(value);
      console.log('Selected section:', this.selectedSection());
      this.setState(value as UserPageState);
    } else {
      console.warn('Invalid section:', value);
    }
  }

  setState(state: UserPageState) {
    this.userPageState.set(state);
  }
}
