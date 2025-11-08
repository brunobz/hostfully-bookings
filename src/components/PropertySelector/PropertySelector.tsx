import { cn } from "@/libs/utils";

interface Property {
  id: string;
  name: string;
}

interface PropertySelectorProps {
  label?: string;
  properties: Property[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const PropertySelector = ({
  label = "Property",
  properties,
  value,
  onChange,
  error,
  className,
  id = "propertyId",
  ...props
}: React.ComponentPropsWithRef<"select"> & PropertySelectorProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#503E9D] focus:border-[#503E9D]",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">Select a property...</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className="text-sm text-red-600 mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
