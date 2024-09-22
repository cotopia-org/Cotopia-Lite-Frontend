import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import CotopiaButton from "@/components/shared-ui/c-button"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import Avatars from "@/components/shared/avatars"
import Participants from "@/components/shared/participants"
import ParticipantsWithPopover from "@/components/shared/participants/with-popover"
import ParticipantDetails from "@/components/shared/room/participant-detail"
import { WorkspaceRoomShortType } from "@/types/room"
import { UserMinimalType } from "@/types/user"
import { Cast, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import DeleteRoom from "./delete-room"
import CotopiaPrompt from "@/components/shared-ui/c-prompt"

type Props = {
  room: WorkspaceRoomShortType
  workspace_id: number
  selected_room_id?: number
}

export default function WorkspaceRoom({
  workspace_id,
  room,
  selected_room_id,
}: Props) {
  const socket = useSocket()

  const router = useRouter()

  const joinRoomHandler = async () => {
    if (selected_room_id !== room.id) {
      socket?.emit("leaveRoom")
      router.push(`/workspaces/${workspace_id}/rooms/${room.id}`)
    }
  }

  const isSelected = selected_room_id ? room?.id === selected_room_id : false
  const participants = room?.participants ?? []

  let clss = "!justify-start !text-left flex-1"
  if (isSelected) clss += ` !bg-black/10 !text-black`

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row items-center justify-between gap-x-2">
        <CotopiaButton
          onClick={() => joinRoomHandler()}
          className={clss}
          variant={isSelected ? "default" : "ghost"}
          startIcon={<Cast className="mr-2" size={16} />}
        >
          {room.title}
        </CotopiaButton>
        <DeleteRoom room={room} onDelete={() => {}} />
      </div>
      <ParticipantsWithPopover roomId={room.id} participants={participants} />
    </div>
  )
}
