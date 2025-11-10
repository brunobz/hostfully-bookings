import type { Property } from "@/types/properties";

interface PropertySelectorProps {
  label?: string;
  properties: Property[];
  error?: string;
  value?: Property | null;
  onChange?: (value: Property | null) => void;
}

export function PropertySelector({
  label,
  properties,
  value,
  onChange,
  error,
}: PropertySelectorProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={"Property"}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id="Property"
        value={value?.id ?? ""}
        onChange={(e) => {
          const selected = properties.find(
            (property) => property.id === e.target.value
          );
          if (onChange) onChange(selected ?? null);
        }}
        className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:ring-[#503E9D]"
        }`}
        aria-invalid={!!error}
      >
        <option value="" disabled hidden>
          Select a property
        </option>
        {properties.map((property) => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}
