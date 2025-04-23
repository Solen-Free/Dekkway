// types/reservation.ts
export interface ReservationDetails {
  property: {
    id: number;
    name: string;
    location: string;
    monthlyPrice: number;
    image: string;
  };
  name: string;
  phone: string;
  email: string;
  paymentMethod : 'visa' | 'mastercard' | 'orange-money' | 'wave';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  orangeMoneyCode?: string;
  wavePhoneNumber?: string;
  transactionId?: string;
}