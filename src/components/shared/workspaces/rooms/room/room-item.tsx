import { SoundIcon } from "@/components/icons"
import { WorkspaceRoomShortType } from "@/types/room"
import RoomOptions from "./room-options"
import { colors } from "@/app/const/vars"

interface Props {
  room: WorkspaceRoomShortType
  isSelected: boolean
  joinRoomHandler: () => void
}

const RoomItem = ({ room, isSelected, joinRoomHandler }: Props) => {
  let clss =
    "flex items-center justify-between rounded-lg p-4 py-3 w-full cursor-pointer "

  if (isSelected) {
    clss += "bg-primary [&_svg_path]:stroke-background [&_span]:text-background"
  }

  return (
    <div onClick={joinRoomHandler} className={clss}>
      <div className="flex items-center gap-x-2 justify-start">
        <SoundIcon size={20} color={colors.grayscale.grayscaleCaption} />
        <span className="font-semibold text-grayscale-subtitle">
          {room.title}
        </span>
      </div>
      {isSelected && <RoomOptions room={room} />}
    </div>
  )
}

export default RoomItem
