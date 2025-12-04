import { SelectedSeat } from "./screening.model";

export interface Ticket {
  id: number;
  type: TicketType;
  seat: SelectedSeat;
}

export const ticketTypes = ["Adult", "Child", "Student", "Senior"] as const;

export type TicketType = typeof ticketTypes[number];

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
