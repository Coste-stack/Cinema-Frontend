import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-fail',
  imports: [],
  templateUrl: './booking-fail-page.html',
  styleUrl: './booking-fail-page.scss',
})
export class BookingFailPage {
  private router = inject(Router);
  errorMessage: string | null = null;

  ngOnInit(): void {
    const navigation = this.router.currentNavigation && this.router.currentNavigation();
    const state = navigation?.extras?.state || history.state;
    this.errorMessage = state['error'] ?? null;
  }

  goBack(): void {
    this.router.navigate(['/rezerwacja/bilety']);
  }

  goHome(): void {
    this.router.navigate(['/repertuar']);
  }
}
