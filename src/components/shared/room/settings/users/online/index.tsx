import TitleEl from "@/components/shared/title-el"
import React from "react"
import { useRoomContext } from "../../../room-context"
import Participants from "@/components/shared/participants"

export default function OnlineUsers() {
  const { leaderboard, workspace_id } = useRoomContext()

  const onlineUsers = leaderboard.filter(
    (x) =>
      x.user.active === 1 &&
      x.user.room_id !== null &&
      x.user.workspace_id === +(workspace_id as string)
  )

  const onlineUsersCount = onlineUsers.length

  return (
    <TitleEl title={`Online (${onlineUsersCount})`}>
      <Participants participants={onlineUsers.map((x) => x.user)} />
    </TitleEl>
  )
}
