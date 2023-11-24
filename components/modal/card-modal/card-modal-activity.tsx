"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem } from "@/components/activity-item"
import { AuditLog } from "@prisma/client"
import { Activity } from "lucide-react"

interface Props {
  logs: AuditLog[]
}

export const CardModalActivity = ({ logs }: Props) => {
  return (
    <div className="flex items-start gap-x-3 w-full mb-6">
      <Activity className="h-6 w-6 mt-1" />
      <div className="w-full">
        <p className="font-semibold mb-2">Activity</p>

        <ol className="space-y-4">
          {logs.map((log) => (
            <ActivityItem key={log.id} log={log} />
          ))}
        </ol>
      </div>
    </div>
  )
}

const SkeletonCardModalActivity = () => (
  <div className="flex items-start gap-x-3 w-full mb-6">
    <Activity className="h-6 w-6 mt-1" />
    <div className="w-full">
      <Skeleton className="w-[60%] h-8 mb-1" />
      <Skeleton className="w-12 h-4" />
    </div>
  </div>
)

CardModalActivity.Skeleton = SkeletonCardModalActivity
