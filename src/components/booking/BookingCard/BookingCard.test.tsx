import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingCard } from "./BookingCard";

const mockBooking = {
  id: "1",
  guestName: "John Doe",
  property: { id: "p1", name: "Ocean View" },
  dateRange: { from: new Date(2025, 10, 9), to: new Date(2025, 10, 14) },
  price: 123.45,
};

describe("BookingCard", () => {
  it("renders booking information correctly", () => {
    render(<BookingCard booking={mockBooking} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("#Ocean View")).toBeInTheDocument();
    expect(screen.getByText(/11\/09\/2025/)).toBeInTheDocument();
    expect(screen.getByText(/11\/14\/2025/)).toBeInTheDocument();
    expect(screen.getByText("$123.45")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<BookingCard booking={mockBooking} onEdit={onEdit} />);

    const editButton = screen.getByRole("button", {
      name: `Edit booking for ${mockBooking.guestName}`,
    });
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockBooking.id);
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<BookingCard booking={mockBooking} onDelete={onDelete} />);

    const deleteButton = screen.getByRole("button", {
      name: `Delete booking for ${mockBooking.guestName}`,
    });
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(mockBooking.id);
  });

  it("renders both Edit and Delete buttons when both callbacks are provided", () => {
    render(
      <BookingCard
        booking={mockBooking}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: `Edit booking for ${mockBooking.guestName}`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `Delete booking for ${mockBooking.guestName}`,
      })
    ).toBeInTheDocument();
  });
});
