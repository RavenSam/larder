"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCardIcon } from "lucide-react"
import Image from "next/image"

export default function Info() {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <SkeletonInfo />
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          src={organization?.imageUrl!}
          alt={organization?.name!}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>

        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="h-3 w-3 mr-1" />
          FREE
        </div>
      </div>
    </div>
  )
}

const SkeletonInfo = () => (
  <div className="flex items-center gap-x-4">
    <Skeleton className="w-[60px] h-[60px]" />

    <div className="space-y-1">
      <Skeleton className="w-40 h-8" />

      <Skeleton className="w-10 h-4" />
    </div>
  </div>
)

Info.Skeleton = SkeletonInfo
