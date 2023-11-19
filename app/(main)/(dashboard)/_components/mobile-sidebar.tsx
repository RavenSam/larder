"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Sidebar from "./sidebar"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function MobileSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const { isOpen, onClose, onOpen } = useMobileSidebar()

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Button
        onClick={onOpen}
        size={"icon"}
        variant={"ghost"}
        className="md:hidden"
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Nav menu</span>
      </Button>

      <Sheet onOpenChange={onClose} open={isOpen}>
        <SheetContent side="left">
          <div className="pt-10 p-2">
            <Sidebar storageKey="sidebar-mobile-state" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
