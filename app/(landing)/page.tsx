import { Button } from "@/components/ui/button"
import { Medal } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import localFont from "next/font/local"
import { Poppins } from "next/font/google"

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
})

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export default function LandingPage() {
  return (
    <div className="flex items-center justify-start flex-col gap-4">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="flex items-center border mb-4 shadow-sm py-2 px-6 tracking-widest bg-gradient-to-r from-amber-200 to-amber-100 text-amber-700 uppercase font-medium rounded-full">
          <Medal className="h-8 w-8 mr-2" />
          No 1 task management
        </div>

        <h1 className="scroll-m-20 text-3xl font-extrabold lg:text-5xl text-neutral-700 mb-4">
          Taskify helps team move
        </h1>
        <div className="text-3xl font-semibold tracking-widest lg:text-5xl p-2 px-8 w-fit bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md text-transparent bg-clip-text">
          work forward.
        </div>
      </div>

      <div
        className={cn(
          "text-sm md:text-base text-neutral-500 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to home office, the way you team work is unique — accoompish
        it all with Taskify.
      </div>

      <Button className="mt-6 text-xl" size="lg" asChild>
        <Link href="/sign-up">Get Taskify For Free</Link>
      </Button>
    </div>
  )
}
