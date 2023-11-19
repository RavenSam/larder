import { Separator } from "@/components/ui/separator"
import Info from "./_components/info"
import BoardsList from "./_components/boards-list"
import { Suspense } from "react"

export default async function OrganizationSlugPage() {
  return (
    <div className="mb-20">
      <Info />

      <Separator className="my-4" />

      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardsList.Skeleton />}>
          <BoardsList />
        </Suspense>
      </div>
    </div>
  )
}
