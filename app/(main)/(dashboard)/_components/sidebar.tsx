"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useLocalStorage } from "usehooks-ts"
import { Accordion } from "@/components/ui/accordion"
import SidebarItem, { Organization } from "./sidebar-item"

interface Props {
  storageKey?: string
}

export default function Sidebar({ storageKey }: Props) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey || "sidebar-state",
    {}
  )

  const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization()
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: { infinite: true },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc
    },
    []
  )

  const onToggleAccordion = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return <SidebarSkeleton />
  }

  return (
    <>
      <div className="font-medium text-sm flex items-center mb-1">
        <span className="pl-4 font-semibold">Workspaces</span>

        <Button
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="ml-auto"
          asChild
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <SidebarItem
            key={organization.id}
            isActive={activeOrg?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onToggleAccordion={onToggleAccordion}
          />
        ))}
      </Accordion>
    </>
  )
}

const SidebarSkeleton = () => (
  <>
    <div className="font-medium text-sm flex items-center justify-between mb-6">
      <span className="pl-4 font-semibold">Workspaces</span>

      <Skeleton className="h-10 w-10" />
    </div>

    <div className="space-y-2">
      <SidebarItem.Skeleton />
      <SidebarItem.Skeleton />
      <SidebarItem.Skeleton />
    </div>
  </>
)
