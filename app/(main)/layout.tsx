"use client"

import React, { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster richColors />

      <ModalProvider />

      {children}
    </ClerkProvider>
  )
}
