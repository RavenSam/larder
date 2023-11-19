"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormSubmitProps {
  children: React.ReactNode
  disabled?: boolean
  spinner?: boolean
  className?: string
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary"
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  spinner,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn(className)}
    >
      {pending && spinner && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
