import { create } from "zustand";
import type { Booking } from "@/types/bookings";

interface BookingState {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  updateBooking: (b: Booking) => void;
  deleteBooking: (id: string) => void;
  setBookings: (bs: Booking[]) => void;
  clear: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
    })),
  updateBooking: (booking) =>
    set((state) => ({
      bookings: state.bookings.map((item) =>
        item.id === booking.id ? booking : item
      ),
    })),
  deleteBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((item) => item.id !== id),
    })),
  setBookings: (bs) => set(() => ({ bookings: bs })),
  clear: () => set(() => ({ bookings: [] })),
}));
