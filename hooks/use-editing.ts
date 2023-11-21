"use client"

import { ElementRef, useRef, useState } from "react"

export const useEditing = ({ el = "input" }: { el?: "input" | "textarea" }) => {
  const elRef = useRef<ElementRef<typeof el>>(null)

  const [isEditing, setIsEditing] = useState(false)

  const enbleEditing = () => {
    setIsEditing(true)

    setTimeout(() => {
      elRef.current?.focus()
    })
  }

  const disableEditing = () => setIsEditing(false)

  return { isEditing, setIsEditing, enbleEditing, disableEditing, elRef }
}
