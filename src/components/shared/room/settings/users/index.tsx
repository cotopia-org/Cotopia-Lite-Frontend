import OnlineUsers from "./online"
import WorkingUsers from "./working"
import OfflineUsers from "./offline"
import ScheduledUsers from "./scheduled"

export default function WorkspaceUsers() {
  return (
    <div className="flex flex-col gap-y-4 py-4">
      <OnlineUsers />
      <WorkingUsers />
      <ScheduledUsers />
      <OfflineUsers />
    </div>
  )
}
