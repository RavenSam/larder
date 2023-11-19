import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

interface Props {
  isActive: boolean
  isExpanded: boolean
  organization: Organization
  onToggleAccordion: (id: string) => void
}

export default function SidebarItem({
  isActive,
  isExpanded,
  onToggleAccordion,
  organization,
}: Props) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Boards",
      icon: Layout,
      href: `/organization/${organization.slug}`,
    },
    {
      label: "Activity",
      icon: Activity,
      href: `/organization/${organization.slug}/activity`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/organization/${organization.slug}/settings`,
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: `/organization/${organization.slug}/billing`,
    },
  ]

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onToggleAccordion(organization.id)}
        className={cn(
          "flex items-center gap-x-2 py-1.5 px-3 text-neutral-700 rounded-lg hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "!bg-sky-500/10 text-sky-500"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative w-7 h-7">
            <Image
              fill
              src={organization.imageUrl}
              alt={organization.name}
              className="rounded-sm object-cover"
            />
          </div>

          <span className="font-medium text-sm">{organization.name}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="pt-1 text-neutral-500 pl-10">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={
              route.href.split("/").at(-1) === "settings"
                ? route.href + "#/organization-settings"
                : route.href
            }
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "w-full text-left justify-start mb-1",
              pathname === route.href && "!bg-sky-500/10 !text-sky-500"
            )}
          >
            <route.icon className="h-4 w-4 mr-2" />
            <span>{route.label}</span>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

const SkeletonSidebarItem = () => (
  <div className="flex items-center gap-x-2">
    <Skeleton className="h-10 w-10" />

    <Skeleton className="h-10 w-full" />
  </div>
)

SidebarItem.Skeleton = SkeletonSidebarItem
