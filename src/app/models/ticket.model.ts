import { SelectedSeat } from "./screening.model";

export interface Ticket {
  id: number;
  type: TicketType;
  seat: SelectedSeat;
}

export const ticketTypes = ["Adult", "Child", "Student", "Senior"] as const;

export type TicketType = typeof ticketTypes[number];

/* DTOs for price controller */

/* Requests */
export interface BookingPriceRequest {
  bookingId?: number;
  screeningId: number;
  tickets: TicketPriceRequest[]
}

export interface TicketPriceRequest {
  seatId: number;
  personTypeName: string;
}

/* Responses */
export interface BookingPriceResponse {
  screeningId: number;
  ticketPrices: TicketPriceResponse[];
  basePrice: number;
  discountedPrice: number;
  appliedOffers: AppliedOfferResponse[];
}

export interface TicketPriceResponse {
  seatId: number;
  personTypeName: string;
  price: number;
}

export interface AppliedOfferResponse {
  offerId: number;
  offerName: string;
  discountAmount: number;
}

/* DTOs for booking controller */

/* Requests */
export interface BookingRequest {
  screeningId: number;
  tickets: TicketRequest[];
  email?: string;
}

export interface TicketRequest {
  seatId: number;
  personTypeName: string;
}
