import { UserMinimalType } from "@/types/user"
import Participants, { ParticipantsProps } from "."
import ParticipantDetails from "../room/participant-detail"
import { useRoomContext } from "../room/room-context"

type Props = ParticipantsProps
export default function ParticipantsWithPopover({ ...rest }: Props) {
  const { room } = useRoomContext()
  const participants = room?.participants ?? []

  return (
    <Participants
      render={(index, content) => {
        const user = participants.find((_, i) => index === i) as
          | UserMinimalType
          | undefined
        if (user === undefined) return content
        return <ParticipantDetails user={user}>{content}</ParticipantDetails>
      }}
      {...rest}
    />
  )
}
