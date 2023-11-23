"use client"

import React, { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster richColors />

        <ModalProvider />

        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}
