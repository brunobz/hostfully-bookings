import { z } from "zod";

export const bookingSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  property: z
    .object({
      id: z.string(),
      name: z.string(),
      address: z.string().optional(),
    })
    .nullable()
    .refine((val) => val !== null, { message: "Property is required" }),
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

export type BookingFormData = z.infer<typeof bookingSchema>;
