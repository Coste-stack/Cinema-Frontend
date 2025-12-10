export interface PayuRequest {
  BookingId: number;
}

export interface PayuResponse {
  bookingId: number;
  orderId: string;
  redirectUri: string;
}
