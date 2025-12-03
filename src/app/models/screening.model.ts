export interface Screening {
  id: number;
  roomId: number;
  roomName: string;
  totalSeats: number;
  availableSeats: number;
  seatMap: SeatMap[];
}

export interface SeatMap {
  row: string;
  seats: Seat[];
}

export interface Seat {
  id: number;
  number: number;
  seatTypeId: number;
  seatTypeName: string;
  isAvailable: boolean;
}

export interface SelectedSeat {
  id: number;
  row: string;
  number: number;
}
