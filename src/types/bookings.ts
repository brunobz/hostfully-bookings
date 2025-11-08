export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  price: number;
}
