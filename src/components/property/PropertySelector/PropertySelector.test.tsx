import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PropertySelector } from "./PropertySelector";

const mockProperties = [
  { id: "1", name: "Seaside Villa" },
  { id: "2", name: "Mountain Cabin" },
  { id: "3", name: "City Apartment" },
];

describe("PropertySelector", () => {
  it("renders label when provided", () => {
    render(
      <PropertySelector
        label="Property"
        properties={mockProperties}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
  });

  it("renders all property options", () => {
    render(<PropertySelector properties={mockProperties} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    mockProperties.forEach((property) => {
      expect(screen.getByText(property.name)).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct property when selection changes", () => {
    const handleChange = vi.fn();
    render(
      <PropertySelector
        label="Property"
        properties={mockProperties}
        onChange={handleChange}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(mockProperties[1]);
  });

  it("calls onChange with null when selection is reset to empty", () => {
    const handleChange = vi.fn();
    render(
      <PropertySelector
        label="Property"
        properties={mockProperties}
        onChange={handleChange}
        value={mockProperties[0]}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "" } });

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("displays the correct initial selected value", () => {
    render(
      <PropertySelector
        label="Property"
        properties={mockProperties}
        value={mockProperties[2]}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("3");
  });

  it("renders an error message when provided", () => {
    render(
      <PropertySelector
        label="Property"
        properties={mockProperties}
        error="Property is required"
      />
    );

    expect(screen.getByText(/Property is required/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("renders without label", () => {
    render(<PropertySelector properties={mockProperties} />);
    expect(screen.queryByLabelText(/Property/i)).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
