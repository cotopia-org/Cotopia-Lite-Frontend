import TitleEl from "@/components/shared/title-el"
import React from "react"
import { useRoomContext } from "../../../room-context"
import moment from "moment"
import { WorkspaceUserType } from "@/types/user"
import ParticipantsWithPopover from "@/components/shared/participants/with-popover"
import * as emoji from "node-emoji"

export default function OfflineUsers() {
  const { workpaceUsers, leaderboard, room_id } = useRoomContext()

  const onlines = leaderboard
    ?.filter((x) => x.user.status === "online" && x.user.room_id !== null)
    .map((x) => x.user.id)

  const allOfflineParticipants = workpaceUsers
    .filter((x) => !onlines.includes(x.id))
    .filter((x) => x.last_login !== null)
    .sort((a, b) => moment(b.last_login).unix() - moment(a.last_login).unix())

  return (
    <TitleEl
      title={`Offline (${allOfflineParticipants.length}) ${emoji.get("zzz")}`}
    >
      <ParticipantsWithPopover
        roomId={room_id}
        avatarClss="grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
        participants={allOfflineParticipants.map((x) => x)}
        customTitle={(x) => {
          const fromNow = moment((x as WorkspaceUserType).last_login).fromNow()
          return `${x.name} (${fromNow})`
        }}
      />
    </TitleEl>
  )
}
