// types/reservation.ts
import { Logement } from "@/Services/api";

export interface ReservationDetails {
  property: {
    id: Logement['id'];
    name: Logement['nom'];
    location: Logement['ville'];
    monthlyPrice: Logement['prix'];
    image: Logement['image'];
  };
  name: string;
  phone: string;
  email: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}