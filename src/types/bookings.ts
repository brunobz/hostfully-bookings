import type { Property } from "./properties";

export interface Booking {
  id: string;
  property: Property | null;
  guestName: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  price: number;
}
