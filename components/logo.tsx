import { Squirrel } from "lucide-react"
import Link from "next/link"
import localFont from "next/font/local"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
})

export default function Logo() {
  return (
    <Link href="/">
      <div
        className={cn(
          "flex items-center hover:opacity-80 transition",
          headingFont.className
        )}
      >
        <Squirrel className="w-8 h-8" />

        <span className="text-lg ml-2 hidden md:block">{siteConfig.name}</span>
      </div>
    </Link>
  )
}
