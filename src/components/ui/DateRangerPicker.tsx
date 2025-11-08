import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

type PartialDateRange = { from?: Date; to?: Date } | undefined;

interface Props {
  label?: string;
  // agora aceitamos DateRange (strict) ou PartialDateRange (while selecting)
  value?: DateRange | PartialDateRange;
  onChange: (range: DateRange | undefined) => void;
  error?: string | undefined;
}

export function DateRangePicker({ label, value, onChange, error }: Props) {
  // format display string
  const formatted =
    value && value.from && value.to
      ? `${format(value.from, "MMM d, yyyy")} — ${format(value.to, "MMM d, yyyy")}`
      : value && value.from
        ? `${format(value.from, "MMM d, yyyy")} — ...`
        : "Select range";

  // Prepare the value to pass to DayPicker's `selected` prop:
  // - If both from and to exist, it's a valid DateRange -> pass it.
  // - Otherwise pass `undefined` (DayPicker will still allow selection UI).
  const dayPickerSelected: DateRange | undefined =
    value && value.from && value.to
      ? { from: value.from, to: value.to }
      : undefined;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <button
        type="button"
        className={`w-full text-left border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:ring-[#503E9D]"
        }`}
        aria-label="Open date picker"
      >
        {formatted}
      </button>

      <div className="mt-2 bg-white p-2 rounded-md shadow-sm">
        <DayPicker
          mode="range"
          selected={dayPickerSelected}
          // onSelect returns DateRange | Date | undefined depending on mode
          onSelect={(r) => {
            // r can be DateRange | Date | undefined; in range mode we expect DateRange | undefined
            onChange((r as DateRange | undefined) ?? undefined);
          }}
          disabled={{ before: new Date() }}
          captionLayout="dropdown"
        />
      </div>

      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
