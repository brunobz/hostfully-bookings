import { useEffect, useState } from "react";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { BookingList } from "@/components/BookingList/BookingList";
import { useBookingStore } from "@/stores/bookingStore";
import type { Booking } from "@/types/bookings";
import { sampleBookings } from "@/data/sampleBookings";
import { Modal } from "./components/ui/Modal";

export default function App() {
  const { bookings, addBooking, updateBooking, deleteBooking, setBookings } =
    useBookingStore();
  const [editing, setEditing] = useState<Booking | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  useEffect(() => {
    setBookings(sampleBookings);
  }, [setBookings]);

  const hasOverlap = (newBooking: Booking) => {
    return bookings.some((b) => {
      if (b.id === newBooking.id) return false;
      if (b.propertyId !== newBooking.propertyId) return false;
      const aFrom = b.dateRange.from.getTime();
      const aTo = b.dateRange.to.getTime();
      const bFrom = newBooking.dateRange.from.getTime();
      const bTo = newBooking.dateRange.to.getTime();
      return aFrom <= bTo && bFrom <= aTo;
    });
  };

  const handleSubmit = (booking: Booking) => {
    setErrorMessage(null);
    if (hasOverlap(booking)) {
      setErrorMessage(
        `Overlapping booking detected for property ${booking.propertyId}.`
      );
      return;
    }
    if (editing) {
      updateBooking(booking);
      setEditing(undefined);
    } else {
      addBooking(booking);
    }
  };

  const handleEdit = (b: Booking) => {
    setErrorMessage(null);
    setEditing(b);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setBookingToDelete(id);
  };

  const confirmDelete = () => {
    if (bookingToDelete) deleteBooking(bookingToDelete);
    setBookingToDelete(null);
  };

  const cancelDelete = () => setBookingToDelete(null);

  const handleCancel = () => setEditing(undefined);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col gap-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-[#503E9D] mb-2">
          Booking Manager
        </h1>
        <p className="text-gray-600">Create, edit, and manage your bookings</p>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        {errorMessage && (
          <div
            role="alert"
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm"
          >
            {errorMessage}
          </div>
        )}

        <BookingForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </section>

      <section className="max-w-6xl mx-auto w-full">
        <BookingList
          bookings={bookings}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          isOpen={!!bookingToDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this booking? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </section>
    </main>
  );
}
