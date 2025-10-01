export interface Venue {
  id?: string;
  name: string;
  registrationDate?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  minCapacity: number;
  maxCapacity: number;
  rentalPrice: number;
  numberOfHours: number;
  contactPhone: string;
  openingTime: string;
  closingTime: string;
}