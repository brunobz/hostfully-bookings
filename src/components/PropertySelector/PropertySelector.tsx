import type { ChangeEvent } from "react";
import { Label } from "../ui/Label";
import { cn } from "@/libs/utils";

export interface Property {
  id: string;
  name: string;
  location?: string;
}

interface PropertySelectorProps {
  label?: string;
  properties: Property[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const PropertySelector = ({
  label = "Select Property",
  properties,
  value,
  onChange,
  error,
  disabled,
}: PropertySelectorProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label id="property-selector-label" label={label} />

      <select
        id="property-selector"
        aria-labelledby="property-selector-label"
        aria-invalid={!!error}
        disabled={disabled}
        value={value ?? ""}
        onChange={handleChange}
        className={cn(
          "rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B93E] transition-all",
          disabled && "opacity-60 cursor-not-allowed",
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        )}
      >
        <option value="" disabled>
          Choose a property...
        </option>
        {properties.map((property) => (
          <option key={property.id} value={property.id}>
            {property.name} {property.location ? `– ${property.location}` : ""}
          </option>
        ))}
      </select>

      {error && (
        <span
          className="text-sm text-red-600 mt-1"
          id="property-selector-error"
        >
          {error}
        </span>
      )}
    </div>
  );
};
