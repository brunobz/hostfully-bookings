import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Booking } from "./Booking";
import type { Booking as TBooking } from "@/types/bookings";

interface BookingFormProps {
  initialData?: TBooking;
  onSubmit: (booking: TBooking) => void;
  onCancel?: () => void;
}

const mockAddBooking = vi.fn();
const mockUpdateBooking = vi.fn();
const mockDeleteBooking = vi.fn();
const mockSetBookings = vi.fn();

vi.mock("@/stores/bookingStore", () => ({
  useBookingStore: () => ({
    bookings: [
      {
        id: "b1",
        guestName: "John",
        property: { id: "p1", name: "Seaside Villa" },
        dateRange: {
          from: new Date("2025-11-10"),
          to: new Date("2025-11-15"),
        },
        price: 100,
      },
    ],
    addBooking: mockAddBooking,
    updateBooking: mockUpdateBooking,
    deleteBooking: mockDeleteBooking,
    setBookings: mockSetBookings,
  }),
}));

const mockOnDelete = vi.fn();
const mockOnConfirm = vi.fn();
const mockOnCancel = vi.fn();

vi.mock("@/hooks/useConfirmationModal", () => ({
  useConfirmationModal: () => ({
    data: null,
    onDelete: mockOnDelete,
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  }),
}));

vi.mock("./BookingForm/BookingForm", () => ({
  BookingForm: ({ onSubmit, onCancel }: BookingFormProps) => (
    <div>
      <button
        onClick={() =>
          onSubmit({
            id: "b2",
            guestName: "Alice",
            property: { id: "p1", name: "Seaside Villa" },
            price: 200,
            dateRange: {
              from: new Date("2025-11-12"),
              to: new Date("2025-11-14"),
            },
          })
        }
      >
        Create Booking (overlap)
      </button>
      <button
        onClick={() =>
          onSubmit({
            id: "b3",
            guestName: "Bob",
            property: { id: "p2", name: "Mountain Cabin" },
            price: 250,
            dateRange: {
              from: new Date("2025-12-01"),
              to: new Date("2025-12-05"),
            },
          })
        }
      >
        Create Booking (ok)
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

vi.mock("./BookingList/BookingList", () => {
  interface BookingListMockProps {
    bookings: TBooking[];
    onEdit: (booking: TBooking) => void;
    onDelete: (id: string) => void;
  }

  const BookingList = ({
    bookings,
    onEdit,
    onDelete,
  }: BookingListMockProps) => (
    <div>
      <p>Bookings: {bookings.length}</p>
      {bookings.map((b) => (
        <div key={b.id}>
          <span>{b.guestName}</span>
          <button onClick={() => onEdit(b)}>Edit</button>
          <button onClick={() => onDelete(b.id)}>Delete</button>
        </div>
      ))}
    </div>
  );

  return { BookingList };
});

vi.mock("../ui/Modal", () => {
  interface ModalMockProps {
    isOpen: boolean;
    title: string;
    children?: React.ReactNode;
  }

  const Modal = ({ isOpen, title }: ModalMockProps) =>
    isOpen ? <div role="dialog">{title}</div> : null;

  return { Modal };
});

describe("Booking Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header and list", () => {
    render(<Booking />);
    expect(screen.getByText(/Booking Manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Bookings:/i)).toBeInTheDocument();
  });

  it("creates booking successfully (non-overlapping)", async () => {
    render(<Booking />);

    fireEvent.click(screen.getByText(/Create Booking \(ok\)/i));

    await waitFor(() =>
      expect(
        screen.getByText(/Booking created successfully/i)
      ).toBeInTheDocument()
    );
  });

  it("shows error when booking overlaps existing dates", async () => {
    render(<Booking />);

    fireEvent.click(screen.getByText(/Create Booking \(overlap\)/i));

    await waitFor(() =>
      expect(
        screen.getByText(/The selected date is no longer available/i)
      ).toBeInTheDocument()
    );
  });

  it("calls delete handler from confirmation hook", async () => {
    render(<Booking />);

    fireEvent.click(screen.getAllByText("Delete")[0]);

    await waitFor(() => expect(mockOnDelete).toHaveBeenCalled());
  });

  it("calls onCancel from BookingForm", () => {
    render(<Booking />);
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(
      screen.queryByText(/Booking updated successfully/i)
    ).not.toBeInTheDocument();
  });
});
