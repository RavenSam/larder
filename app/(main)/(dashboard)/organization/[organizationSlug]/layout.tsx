import React, { ReactNode } from "react"
import OrgControl from "./_components/org-control"
import { startCase } from "lodash"
import { auth } from "@clerk/nextjs"

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || "organization"),
  }
}

export default function OrgLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <OrgControl />

      {children}
    </>
  )
}
