import { useState, useEffect } from "react";
import { Input } from "../ui/Input";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  id: string;
  error?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export function CurrencyInput({
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState<string>(
    value ? value.toString() : ""
  );

  useEffect(() => {
    setDisplayValue(
      value !== undefined && value !== null ? value.toString() : ""
    );
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setDisplayValue(val);

    const numberVal = parseFloat(val);
    if (!isNaN(numberVal)) {
      onChange(numberVal);
    } else {
      onChange(0);
    }
  };

  const handleBlur = () => {
    if (!displayValue) return;
    const numberVal = parseFloat(displayValue);
    if (!isNaN(numberVal)) {
      setDisplayValue(
        numberVal.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  };

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
