import { useState, useEffect } from "react"

import { CardModal } from "@/components/modal/card-modal"

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CardModal />
    </>
  )
}
