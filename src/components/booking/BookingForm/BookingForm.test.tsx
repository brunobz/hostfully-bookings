import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookingForm } from "./BookingForm";
import { mockProperties } from "@/data/properties";

const mockBooking = {
  id: "1",
  guestName: "John Doe",
  property: mockProperties[0],
  dateRange: { from: new Date("2025-11-09"), to: new Date("2025-11-14") },
  price: 123.45,
};

describe("BookingForm", () => {
  it("renders all form fields", () => {
    render(<BookingForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/Guest Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price \(USD\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Booking Dates/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Booking/i })
    ).toBeInTheDocument();
  });

  it("shows error messages for required fields and price > 0", async () => {
    const onSubmit = vi.fn();
    render(<BookingForm onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole("form", { name: /Booking form/i }));

    expect(
      await screen.findByText(/Guest Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Property is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Price must be greater than 0/i)
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/Price \(USD\)/i), {
      target: { value: "0" },
    });
    fireEvent.submit(screen.getByRole("form", { name: /Booking form/i }));

    expect(
      await screen.findByText(/Price must be greater than 0/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("renders initial data if provided", () => {
    render(<BookingForm initialData={mockBooking} onSubmit={vi.fn()} />);

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockBooking.price.toString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockBooking.property.name}`)
    ).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<BookingForm onSubmit={vi.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
