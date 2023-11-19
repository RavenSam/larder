import React, { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster richColors />

      {children}
    </ClerkProvider>
  )
}
