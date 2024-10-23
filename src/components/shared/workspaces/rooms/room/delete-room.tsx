import { colors } from "@/app/const/vars"
import { TrashIcon } from "@/components/icons"
import CotopiaButton from "@/components/shared-ui/c-button"
import CDialog from "@/components/shared-ui/c-dialog"
import CotopiaPromptContent from "@/components/shared-ui/c-prompt/content"
import { useRoomContext } from "@/components/shared/room/room-context"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { WorkspaceRoomShortType } from "@/types/room"
import React from "react"

type Props = {
  room: WorkspaceRoomShortType
  onDelete?: () => void
}

export default function DeleteRoom({ room, onDelete }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading()

  const { workspace_id } = useRoomContext()

  const handleDelete = () => {
    startLoading()
    axiosInstance
      .delete(`workspaces/${workspace_id}/rooms/${room.id}`)
      .then((res) => {
        stopLoading()
        if (onDelete) onDelete()
      })
      .catch((err) => {
        stopLoading()
      })
  }

  return (
    <CDialog
      trigger={(open) => (
        <CotopiaButton
          variant={"ghost"}
          startIcon={<TrashIcon size={20} color={colors.destructive} />}
          onClick={open}
          className="text-sm"
          disabled={isLoading}
        >
          Delete room
        </CotopiaButton>
      )}
    >
      {(close) => (
        <CotopiaPromptContent
          title="Delete room"
          submitText="Delete"
          description="Are you sure to delete this room?!"
          onSubmit={handleDelete}
          onClose={close}
        />
      )}
    </CDialog>
  )
}
