import { Component, inject, signal } from '@angular/core';
import { OfferList } from '../offer-list/offer-list';
import { LoadingService } from '../../services/loading-service';
import { OfferService } from '../../services/offer-service';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-offers-page',
  imports: [OfferList],
  templateUrl: './offers-page.html',
  styleUrl: './offers-page.scss',
})
export class OffersPage {
  private offerService = inject(OfferService);
  offerList = signal<Array<Offer>>([]);

  error = signal<string | null>(null);
  private loadingService = inject(LoadingService);
  isLoading = (key: string) => this.loadingService.isLoading(key);
  readonly offersKey: string = "offers";

  ngOnInit(): void {
    this.loadOffers();
  }

  private loadOffers(): void {
    this.loadingService.loadingOn(this.offersKey);
    this.error.set(null);

    this.offerService.getAll(true)
      .subscribe({
        next: (movies) => {
          console.log('Successfully received offers');
          this.offerList.set(movies);
          this.loadingService.loadingOff(this.offersKey);
        },
        error: (err) => {
          console.error('Error loading offers:', err);
          this.error.set('Failed to load offers');
          this.loadingService.loadingOff(this.offersKey);
        }
      }
    );
  }
}
