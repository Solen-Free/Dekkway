// types/reservation.ts
export interface ReservationDetails {
    name: string;
    phone: string;
    email: string;
    paymentMethod: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
    propertyName: string;
    location: string;
  }