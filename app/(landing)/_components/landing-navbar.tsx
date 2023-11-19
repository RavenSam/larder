import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between p-4 md:px-6 max-w-screen-2xl mx-auto">
        <Logo />

        <div className="flex items-center gap-4">
          <Button className="" variant={"outline"} size="sm" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button className="" size="sm" asChild>
            <Link href="/sign-up">Get Taskify For Free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
