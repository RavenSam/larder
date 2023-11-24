import { AuditLog } from "@prisma/client"
import { generatedLogMessage } from "@/utils/generate-logs-message"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface Props {
  log: AuditLog
}
// =============================================
// =============================================
// Implimented only for created card
// TODO - impliment activity for other actions
// =============================================
// =============================================

export const ActivityItem = ({ log }: Props) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src={log.userImage} />
      </Avatar>

      <div className="flex flex-col space-y-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground mr-2">
            {log.userName}
          </span>
          {generatedLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground/80">
          {format(new Date(log.createdAt), "MMM d, yyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}
