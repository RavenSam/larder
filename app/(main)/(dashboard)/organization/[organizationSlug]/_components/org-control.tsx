"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect } from "react"

export default function OrgControl() {
  const params = useParams<{ organizationSlug: string }>()

  const { setActive, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  })

  useEffect(() => {
    if (!setActive) return

    const membership = userMemberships.data.find(
      ({ organization }) => organization.slug == params.organizationSlug
    )

    if (!membership) return

    setActive({ organization: membership.organization.id })
  }, [setActive, params.organizationSlug, userMemberships.data])

  return null
}
