import MoreHorizontal from "@/components/icons/more-horiz"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaPopover from "@/components/shared-ui/c-popover"
import React from "react"
import colors from "tailwindcss/colors"
import DeleteRoom from "./delete-room"
import { WorkspaceRoomShortType } from "@/types/room"

interface Props {
  room: WorkspaceRoomShortType
}

const RoomOptions = ({ room }: Props) => {
  return (
    <CotopiaPopover
      trigger={
        <CotopiaIconButton
          type="button"
          className="!bg-transparent hover:!bg-black/[0.10] w-6 h-6"
        >
          <MoreHorizontal size={16} color={colors.white} />
        </CotopiaIconButton>
      }
      contentClassName="w-auto p-1"
    >
      <DeleteRoom room={room} />
    </CotopiaPopover>
  )
}

export default RoomOptions
