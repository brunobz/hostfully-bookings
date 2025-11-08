import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Booking } from "@/types/bookings";
import { mockProperties } from "@/data/properties";
import { bookingSchema, type BookingFormData } from "@/schemas/bookingSchema";

import { PropertySelector } from "@/components/property/PropertySelector/PropertySelector";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DateRangePicker } from "@/components/ui/DateRangerPicker";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
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
    defaultValues: {
      guestName: "",
      property: null,
      dateRange: { from: undefined, to: undefined },
      price: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        guestName: initialData.guestName,
        property: initialData.property,
        dateRange: {
          from: initialData.dateRange?.from,
          to: initialData.dateRange?.to,
        },
        price: initialData.price,
      });
    } else {
      reset({
        guestName: "",
        property: undefined,
        dateRange: { from: undefined, to: undefined },
        price: 0,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (!data.property) return;

        const booking: Booking = {
          id: initialData?.id ?? crypto.randomUUID(),
          guestName: data.guestName,
          property: data.property,
          price: data.price,
          dateRange: {
            from: data.dateRange.from!,
            to: data.dateRange.to!,
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
      <div className="flex flex-col">
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
      </div>

      {/* Property Selector */}
      <Controller<BookingFormData, "property">
        control={control}
        name="property"
        render={({ field }) => (
          <PropertySelector
            label="Property"
            properties={mockProperties}
            value={field.value}
            onChange={field.onChange}
            error={errors.property?.message}
          />
        )}
      />

      {/* Price */}
      <div className="flex flex-col">
        <Label id="price" label="Price (USD)" />
        <Controller<BookingFormData, "price">
          control={control}
          name="price"
          render={({ field }) => (
            <CurrencyInput
              id="price"
              value={field.value}
              onChange={field.onChange}
              aria-invalid={!!errors.price}
              aria-describedby="price-error"
              error={!!errors.price?.message}
            />
          )}
        />
        {errors.price?.message && (
          <span id="price-error" className="text-sm text-red-600 mt-1">
            {errors.price.message}
          </span>
        )}
      </div>

      {/* Date Range */}
      <div>
        <Controller<BookingFormData, "dateRange">
          control={control}
          name="dateRange"
          render={({ field }) => (
            <DateRangePicker
              label="Booking Dates"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.dateRange?.from || !!errors.dateRange?.to}
            />
          )}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-[#503E9D] text-[#503E9D] bg-white hover:bg-[#f4f1fb] focus:ring-2 focus:ring-[#503E9D] focus:ring-offset-2 transition-all cursor-pointer"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="px-4 py-2 rounded-md font-medium bg-[#503E9D] text-white hover:bg-[#3E2E84] focus:ring-2 focus:ring-[#F4B93E] focus:ring-offset-2 transition-all cursor-pointer"
        >
          {initialData ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </form>
  );
}
