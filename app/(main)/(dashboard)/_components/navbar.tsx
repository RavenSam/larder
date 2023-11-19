import Logo from "@/components/logo"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import React from "react"
import MobileSidebar from "./mobile-sidebar"

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 w-full p-3 md:px-6 border-b shadow-sm bg-white/40 backdrop-blur flex items-center">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />

        <div className="">
          <Logo />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-3">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:slug"}
          afterSelectPersonalUrl={"/organization/:slug"}
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              card: {
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                border: "1px solid hsl(var(--border))",
              },
            },
          }}
        />

        <div className="h-6 w-[1px] bg-gray-200" />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: { height: 30, width: 30 },
              card: {
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                border: "1px solid hsl(var(--border))",
              },
            },
          }}
        />
      </div>
    </nav>
  )
}
