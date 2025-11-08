import type React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export const Button = ({
  children,
  ...props
}: React.ComponentPropsWithRef<"button"> & ButtonProps) => {
  return (
    <button className={` ${props.className}`} {...props}>
      {children}
    </button>
  );
};
