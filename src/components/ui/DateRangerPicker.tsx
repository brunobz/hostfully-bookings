import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

type PartialDateRange = { from?: Date; to?: Date } | undefined;

interface Props {
  label?: string;
  value?: DateRange | PartialDateRange;
  onChange: (range: DateRange | undefined) => void;
  error?: string | undefined;
}

export function DateRangePicker({ label, value, onChange, error }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentYear = new Date().getFullYear();
  const formatted =
    value && value.from && value.to
      ? `${format(value.from, "MMM d, yyyy")} — ${format(value.to, "MMM d, yyyy")}`
      : value && value.from
        ? `${format(value.from, "MMM d, yyyy")} — ...`
        : "Select range";

  const dayPickerSelected: DateRange | undefined =
    value && value.from ? { from: value.from, to: value.to } : undefined;

  return (
    <div className="flex flex-col relative" ref={ref}>
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
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {formatted}
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 bg-white p-2 rounded-md shadow-md"
          role="dialog"
          aria-modal="true"
        >
          <DayPicker
            mode="range"
            selected={dayPickerSelected}
            onSelect={(range) => onChange(range ?? undefined)}
            disabled={{ before: new Date() }}
            captionLayout="dropdown"
            fromYear={currentYear}
            toYear={currentYear + 5}
          />
        </div>
      )}

      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
