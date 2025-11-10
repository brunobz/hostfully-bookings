import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import type { Booking } from "@/types/bookings";

interface BookingCardProps {
  booking: Booking;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const BookingCard = ({
  booking,
  onEdit,
  onDelete,
  className,
}: BookingCardProps) => {
  const { id, guestName, property, dateRange, price } = booking;

  const formatDate = (date?: Date) => {
    if (!date) return "—";
    const d = typeof date === "string" ? new Date(date) : date;
    return format(d, "MM/dd/yyyy");
  };

  return (
    <article
      aria-label={`Booking for ${guestName}`}
      className={cn("w-full", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              {guestName}
            </span>
            <span className="text-sm text-gray-500">#{property?.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Stay:</span>{" "}
            {formatDate(dateRange?.from)} – {formatDate(dateRange?.to)}
          </div>

          <div>
            <span className="font-medium">Total price:</span> $
            {price.toFixed(2)}
          </div>

          {(onEdit || onDelete) && (
            <div className="flex gap-2 pt-2">
              {onEdit && (
                <Button
                  variant="secondary"
                  aria-label={`Edit booking for ${guestName}`}
                  onClick={() => onEdit(id)}
                  className="cursor-pointer"
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="primary"
                  aria-label={`Delete booking for ${guestName}`}
                  onClick={() => onDelete(id)}
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
};
