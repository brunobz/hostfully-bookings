import type { ComponentPropsWithRef } from "react"

interface InputProps {
    id: string
    error: boolean
}

export const Input = ({ id, error, ...props }: ComponentPropsWithRef<'input'> & InputProps) => {
    return (
        <input
        id={id}
        {...props}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:ring-[#503E9D]"
        }`}
      />
    )
}