import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingList } from "./BookingList";
import type { Booking } from "@/types/bookings";

const mockBookings: Booking[] = [
  {
    id: "1",
    guestName: "John Doe",
    property: { id: "1", name: "Ocean View" },
    dateRange: { from: new Date(2025, 10, 9), to: new Date(2025, 10, 14) },
    price: 123.45,
  },
  {
    id: "2",
    guestName: "Jane Smith",
    property: { id: "2", name: "Mountain Lodge" },
    dateRange: { from: new Date(2025, 10, 15), to: new Date(2025, 10, 20) },
    price: 456.78,
  },
];

describe("BookingList", () => {
  it("renders a list of BookingCards", () => {
    render(<BookingList bookings={mockBookings} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("#Ocean View")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("#Mountain Lodge")).toBeInTheDocument();
  });

  it("renders 'No bookings found' when list is empty", () => {
    render(<BookingList bookings={[]} />);
    expect(screen.getByRole("status")).toHaveTextContent("No bookings found.");
  });

  it("calls onEdit when edit button of a BookingCard is clicked", () => {
    const onEdit = vi.fn();
    render(<BookingList bookings={mockBookings} onEdit={onEdit} />);

    const editButtons = screen.getAllByRole("button", {
      name: /Edit booking for/i,
    });
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(mockBookings[0]);
  });

  it("calls onDelete when delete button of a BookingCard is clicked", () => {
    const onDelete = vi.fn();
    render(<BookingList bookings={mockBookings} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole("button", {
      name: /Delete booking for/i,
    });
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith(mockBookings[1].id);
  });
});
