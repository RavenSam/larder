import { ReactNode } from "react"
import LandingNavbar from "./_components/landing-navbar"
import LandingFooter from "./_components/landing-footer"

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full bg-slate-100">
      <LandingNavbar />

      <main className="py-20 h-full">{children}</main>

      <LandingFooter/>
    </div>
  )
}
