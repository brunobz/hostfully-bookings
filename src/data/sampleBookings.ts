import type { Booking } from "@/types/bookings";

export const sampleBookings: Booking[] = [
  {
    id: "b1",
    guestName: "Alice Johnson",
    propertyId: "prop-1",
    dateRange: { from: new Date(2025, 10, 10), to: new Date(2025, 10, 13) },
    price: 450,
  },
  {
    id: "b2",
    guestName: "Mark Lee",
    propertyId: "prop-2",
    dateRange: { from: new Date(2025, 10, 15), to: new Date(2025, 10, 17) },
    price: 320,
  },
];
