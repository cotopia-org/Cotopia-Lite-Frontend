import Participants from "@/components/shared/participants"
import TitleEl from "@/components/shared/title-el"
import React from "react"
import { useRoomContext } from "../../../room-context"

export default function ScheduledUsers() {
  const { scheduled } = useRoomContext()
  const scheduledUsers = scheduled.length

  return (
    <TitleEl title={`Scheduled (${scheduledUsers})`}>
      <Participants
        participants={scheduled.map((s) => s.user)}
        customTitle={(x) => {
          const userSchedule = scheduled.find((s) => s.user.id === x.id)
          const days = userSchedule?.days.length ?? 0
          let title = `${x.name}`
          if (userSchedule && days)
            title = `${x.name} (in ${days} ${days < 2 ? "day" : "days"})`
          return title
        }}
      />
    </TitleEl>
  )
}
