import type { Booking } from "@/types/bookings";

export const sampleBookings: Booking[] = [
  {
    id: "1",
    guestName: "Alice Johnson",
    property: { id: "1", name: "Seaside Villa" },
    dateRange: { from: new Date(2025, 10, 10), to: new Date(2025, 10, 13) },
    price: 450,
  },
  {
    id: "2",
    guestName: "Mark Lee",
    property: { id: "2", name: "Mountain Cabin" },
    dateRange: { from: new Date(2025, 10, 15), to: new Date(2025, 10, 17) },
    price: 320,
  },
];
