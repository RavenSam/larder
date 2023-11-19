import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"

export default function LandingFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="flex items-center justify-between p-4 md:px-6 max-w-screen-2xl mx-auto">
        {/* <Logo /> */}

        <div className=""></div>

        <div className="flex items-center gap-2">
          <Button className="text-neutral-500 hover:text-neutral-800" variant={"link"} size="sm" >
            Privacy Policy
          </Button>
          <Button className="text-neutral-500 hover:text-neutral-800" variant={"link"} size="sm" >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  )
}
