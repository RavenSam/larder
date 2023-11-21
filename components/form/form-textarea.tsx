"use client"

import { KeyboardEvent, forwardRef } from "react"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form/form-error"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Textarea } from "../ui/textarea"

interface FormTextareaProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  defaultValue?: string
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void
  onClick?: () => void
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    const {
      name,
      className,
      defaultValue = "",
      disabled,
      errors,
      label,
      placeholder,
      required,
      onBlur,
      onKeyDown,
      onClick,
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

          <Textarea
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={name}
            id={name}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            aria-describedby={`${name}-error`}
          />

          <FormError id={name} errors={errors} />
        </div>
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"
