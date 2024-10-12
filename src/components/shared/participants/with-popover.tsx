import { UserMinimalType } from "@/types/user"
import Participants, { ParticipantsProps } from "."
import ParticipantDetails from "../room/participant-detail"

type Props = ParticipantsProps & { roomId?: number }
export default function ParticipantsWithPopover(props: Props) {
  const { participants, roomId, ...rest } = props

  return (
    <Participants
      render={(item, content) => {
        const user = participants.find((p) => item.id === p.id) as
          | UserMinimalType
          | undefined
        if (user === undefined) {
          return content
        } else {
          return (
            <ParticipantDetails roomId={roomId} user={user}>
              {content}
            </ParticipantDetails>
          )
        }
      }}
      participants={participants}
      {...rest}
    />
  )
}
