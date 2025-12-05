import { SelectedSeat } from "./screening.model";

export interface Ticket {
  id: number;
  type: TicketType;
  seat: SelectedSeat;
}

export const ticketTypes = ["Adult", "Child", "Student", "Senior"] as const;

export type TicketType = typeof ticketTypes[number];

/* DTOs for price controller */

export interface TicketBulkPriceRequest {
  screeningId: number;
  tickets: TicketPriceRequest[]
}

export interface TicketPriceRequest {
  seatId: number;
  personTypeName: string;
}

export interface TicketBulkPriceResponse {
  screeningId: number;
  ticketPrices: TicketPriceResponse[];
  totalPrice: number;
}

export interface TicketPriceResponse {
  seatId: number;
  personTypeName: string;
  price: number;
}

/* DTOs for booking controller */

export interface BookingRequest {
  screeningId: number;
  tickets: TicketPriceRequest[];
  email?: string;
}

export interface TicketRequest {
  seatId: number;
  personTypeName: string;
}
