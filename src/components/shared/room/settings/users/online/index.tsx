import TitleEl from "@/components/shared/title-el"
import React from "react"
import { useRoomContext } from "../../../room-context"
import Participants from "@/components/shared/participants"
import ParticipantsWithPopover from "@/components/shared/participants/with-popover"
export default function OnlineUsers() {
  const { leaderboard, workspace_id, usersHaveJobs } = useRoomContext()

  const usersHaveJobsId = usersHaveJobs.map((x) => x.id)
  const onlineUsers = leaderboard.filter(
    (x) =>
      x.user.active === 1 &&
      x.user.room_id !== null &&
      x.user.workspace_id === +(workspace_id as string) &&
      !usersHaveJobsId.includes(x.user.id)
  )

  const onlineUsersCount = onlineUsers.length

  return (
    <TitleEl title={`Online (${onlineUsersCount})`}>
      <ParticipantsWithPopover
        className="!pb-0"
        participants={onlineUsers.map((x) => x.user)}
      />
    </TitleEl>
  )
}
