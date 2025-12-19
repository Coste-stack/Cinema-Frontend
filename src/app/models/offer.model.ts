export interface Offer {
  id: number;
  name: string;
  description: number;
  isActive: boolean;
  validFrom: Date;
  validTo: Date;
  priority: number;
  isStackable: boolean;
  conditions: OfferCondition[];
  effects: OfferEffect[];
}

export interface OfferCondition {
  conditionType: string;
  conditionValue: string;
}

export interface OfferEffect {
  effectType: string;
  effectValue: number;
}
