import type { ComponentPropsWithRef } from "react"

interface LabelProps {
    id: string
    label: string
}

export const Label = ({ id, label }: ComponentPropsWithRef<'label'> & LabelProps) => {
    return (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )
}