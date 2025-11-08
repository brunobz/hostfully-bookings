import React from "react";
import { BookingCard } from "@/components/booking/BookingCard/BookingCard";
import type { Booking } from "@/types/bookings";
import { cn } from "@/libs/utils";

export interface BookingListProps {
  bookings: Booking[];
  onEdit?: (booking: Booking) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onEdit,
  onDelete,
  className,
}) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="text-center py-8 text-gray-500"
      >
        No bookings found.
      </div>
    );
  }

  return (
    <section
      role="region"
      aria-label="Booking list"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onEdit={onEdit ? () => onEdit(booking) : undefined}
          onDelete={onDelete ? () => onDelete(booking.id) : undefined}
        />
      ))}
    </section>
  );
};
