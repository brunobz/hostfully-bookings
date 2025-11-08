import { useForm, Controller } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Booking } from "../../types/bookings";

import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { DateRangePicker } from "../ui/DateRangerPicker";

const bookingSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  propertyId: z.string().min(1, "Property is required"),
  dateRange: z
    .object({
      from: z.date().refine((d) => !!d, { message: "Start date is required" }),
      to: z.date().refine((d) => !!d, { message: "End date is required" }),
    })
    .refine((r) => r.from <= r.to, {
      message: "Start date cannot be after end date",
      path: ["from"],
    }),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .refine((n) => !isNaN(n), { message: "Price must be a number" }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  initialData?: Booking;
  onSubmit: (data: Booking) => void;
  onCancel?: () => void;
}

export function BookingForm({
  initialData,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  const resolver = zodResolver(
    bookingSchema
  ) as unknown as Resolver<BookingFormData>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver,
    defaultValues: initialData
      ? {
          guestName: initialData.guestName,
          propertyId: initialData.propertyId,
          dateRange: {
            from: initialData.dateRange?.from,
            to: initialData.dateRange?.to,
          },
          price: initialData.price,
        }
      : {
          guestName: "",
          propertyId: "",
          dateRange: { from: undefined, to: undefined },
          price: 0,
        },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const booking: Booking = {
          id: initialData?.id ?? crypto.randomUUID(),
          guestName: data.guestName,
          propertyId: data.propertyId,
          price: data.price,
          dateRange: {
            from: data.dateRange.from,
            to: data.dateRange.to,
          },
        };
        onSubmit(booking);
        reset();
      })}
      className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto border border-gray-100 space-y-5"
      aria-label="Booking form"
    >
      <h2 className="text-xl font-semibold text-[#503E9D]">Booking Details</h2>

      {/* Guest Name */}
      <Label id="guestName" label="Guest Name" />
      <Input
        id="guestName"
        {...register("guestName")}
        aria-invalid={!!errors.guestName}
        aria-describedby="guestName-error"
        error={!!errors.guestName?.message}
      />
      {errors.guestName?.message && (
        <span id="guestName-error" className="text-sm text-red-600 mt-1">
          {errors.guestName.message}
        </span>
      )}

      {/* Property */}
      <Label id="propertyId" label="Property ID" />
      <Input
        id="propertyId"
        {...register("propertyId")}
        aria-invalid={!!errors.propertyId}
        aria-describedby="propertyId-error"
        error={!!errors.propertyId?.message}
      />
      {errors.propertyId?.message && (
        <span id="propertyId-error" className="text-sm text-red-600 mt-1">
          {errors.propertyId.message}
        </span>
      )}

      {/* Date Range */}
      <div>
        <Controller<BookingFormData, "dateRange">
          control={control}
          name="dateRange"
          render={({ field }) => (
            <DateRangePicker
              label="Booking Dates"
              value={field.value}
              onChange={(v) => field.onChange(v)}
              error={errors.dateRange?.message}
            />
          )}
        />
        {errors.dateRange?.message && (
          <span className="text-sm text-red-600 mt-1">
            {errors.dateRange.message}
          </span>
        )}
      </div>

      {/* Price */}
      <Label id="price" label="Price (USD)" />
      <Input
        id="price"
        type="number"
        step="0.01"
        {...register("price", { valueAsNumber: true })}
        aria-invalid={!!errors.price}
        aria-describedby="price-error"
        error={!!errors.price?.message}
      />
      {errors.price?.message && (
        <span id="price-error" className="text-sm text-red-600 mt-1">
          {errors.price.message}
        </span>
      )}

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary">
          {initialData ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </form>
  );
}
