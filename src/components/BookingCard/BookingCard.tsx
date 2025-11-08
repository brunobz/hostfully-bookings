import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/libs/utils";

export interface DateRange {
  from: Date;
  to: Date;
}

export interface Booking {
  id: string;
  guestName: string;
  propertyId: string;
  dateRange: DateRange;
  price: number;
}

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
  const { id, guestName, propertyId, dateRange, price } = booking;

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
            <span className="text-sm text-gray-500">#{propertyId}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm text-gray-700">
          <div>
            <span className="font-medium">Stay:</span>{" "}
            {dateRange?.from
              ? new Date(dateRange.from).toLocaleDateString()
              : "—"}{" "}
            –{" "}
            {dateRange?.to ? new Date(dateRange.to).toLocaleDateString() : "—"}
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
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="primary"
                  aria-label={`Delete booking for ${guestName}`}
                  onClick={() => onDelete(id)}
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
