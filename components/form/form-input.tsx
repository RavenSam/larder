"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form/form-error"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface FormInputProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const {
      name,
      className,
      defaultValue = "",
      disabled,
      errors,
      label,
      onBlur,
      placeholder,
      required,
      type = "text",
    } = props
    const { pending } = useFormStatus()

    const [parent] = useAutoAnimate()

    return (
      <div className="space-y-2">
        <div className="space-y-1" ref={parent}>
          {!!label && (
            <Label
              htmlFor={name}
              className="text-base font-semibold text-neutral-700"
            >
              {label}
            </Label>
          )}

          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={name}
            id={name}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn("", className)}
            aria-describedby={`${name}-error`}
          />

          <FormError id={name} errors={errors} />
        </div>
      </div>
    )
  }
)

FormInput.displayName = "FormInput"
