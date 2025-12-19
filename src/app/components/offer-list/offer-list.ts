import { Component, Input } from '@angular/core';
import { LoadingComponent } from '../loading-component/loading-component';
import { Offer } from '../../models/offer.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-offer-list',
  imports: [LoadingComponent, DatePipe],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.scss',
})
export class OfferList {
  @Input() offerList: Offer[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;

  getOfferEffects(offerId: number): string[] {
    const offer: Offer | undefined = this.offerList.find((o: Offer) => o.id === offerId);
    const effects: string[] = [];
    if (!offer || !offer.effects) {
      return effects;
    }
    offer.effects.forEach(eff => {
      let str: string = "";
      if (!eff.effectType || !eff.effectValue) {
        effects.push(str);
      }
      str += eff.effectValue;
      if (eff.effectType === "PercentageDiscount") {
        str += "%";
      } else if (eff.effectType === "FixedDiscount") {
        str += "zł";
      }
      if (str) {
        effects.push(str);
      }
    });
    return effects;
  }

}
