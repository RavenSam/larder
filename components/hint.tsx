import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
  children: React.ReactNode
  descripttion: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

export const Hint = ({
  children,
  descripttion,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="text-xs max-w-[220px] text-left whitespace-normal"
        >
          {descripttion}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
