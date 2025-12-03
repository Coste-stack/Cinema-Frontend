import { SelectedSeat } from "./screening.model";

export interface Ticket {
  id: number;
  type: TicketType;
  seat: SelectedSeat;
}

export const ticketTypes = ["normalny", "ulgowy"] as const;

export type TicketType = typeof ticketTypes[number];
