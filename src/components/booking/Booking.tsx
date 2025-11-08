import { useEffect, useState } from "react";
import { BookingForm } from "./BookingForm/BookingForm";
import { BookingList } from "./BookingList/BookingList";
import { useBookingStore } from "@/stores/bookingStore";
import type { Booking as TBooking } from "@/types/bookings";
import { sampleBookings } from "@/data/sampleBookings";
import { Modal } from "../ui/Modal";

export const Booking = () => {
  const { bookings, addBooking, updateBooking, deleteBooking, setBookings } =
    useBookingStore();

  const [editing, setEditing] = useState<TBooking | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  useEffect(() => {
    setBookings(sampleBookings);
  }, [setBookings]);

  const hasOverlap = (newBooking: TBooking) => {
    return bookings.some((booking) => {
      if (booking.id === newBooking.id) return false;
      if (booking.property?.id !== newBooking.property?.id) return false;
      const aFrom = booking.dateRange.from.getTime();
      const aTo = booking.dateRange.to.getTime();
      const bFrom = newBooking.dateRange.from.getTime();
      const bTo = newBooking.dateRange.to.getTime();
      return aFrom <= bTo && bFrom <= aTo;
    });
  };

  const handleSubmit = (booking: TBooking) => {
    setErrorMessage(null);

    if (hasOverlap(booking)) {
      setErrorMessage(
        `The selected date is no longer available for the property ${booking.property?.name}.`
      );
      setSuccessMessage(null);
      return;
    }

    if (editing) {
      updateBooking(booking);
      setEditing(undefined);
      setSuccessMessage("Booking updated successfully!");
      setErrorMessage(null);
    } else {
      addBooking(booking);
      setSuccessMessage("Booking created successfully!");
      setErrorMessage(null);
    }
  };

  const handleEdit = (booking: TBooking) => {
    setErrorMessage(null);
    setEditing(booking);
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

  const handleCancel = () => {
    setEditing(undefined);
    setErrorMessage(null);
  };

  return (
    <>
      <header className="text-center">
        <h1 className="text-3xl font-bold text-[#503E9D] mb-2">
          Booking Manager
        </h1>
        <p className="text-gray-600">Create, edit, and manage your bookings</p>
      </header>

      <section className="max-w-3xl mx-auto w-full">
        <BookingForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </section>

      <section className="max-w-6xl mx-auto w-full">
        {errorMessage && (
          <div
            role="alert"
            className="flex justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm"
          >
            {errorMessage}
            <button
              onClick={() => setErrorMessage(null)}
              className="ml-3 text-red-700 hover:text-red-900 font-semibold text-lg leading-none focus:outline-none cursor-pointer"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-between mb-4 p-3 rounded-md bg-green-100 border border-green-300 text-green-700 text-sm transition-opacity">
            {successMessage}
            <button
              onClick={() => setSuccessMessage(null)}
              className="ml-3 text-green-700 hover:text-green-900 font-semibold text-lg leading-none focus:outline-none cursor-pointer"
              aria-label="Close success message"
            >
              ×
            </button>
          </div>
        )}
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
    </>
  );
};
