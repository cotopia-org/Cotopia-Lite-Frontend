import FullLoading from "@/components/shared/full-loading"
import { useApi } from "@/hooks/swr"
import AddRoom from "./add-room"
import WorkspaceRooms from "@/components/shared/workspaces/rooms"
import { WorkspaceRoomShortType } from "@/types/room"
import { FetchDataType } from "@/lib/axios"
import { useParams } from "next/navigation"
import { useSocket } from "../../../protected-wrapper"
import { useEffect, useState } from "react"

type Props = {
  workspace_id: string
}

export default function WorkspaceRoomsHolder({ workspace_id }: Props) {
  const { room_id } = useParams()

  const [rooms, setRooms] = useState<WorkspaceRoomShortType[]>([])

  const { data, isLoading, mutate } = useApi<
    FetchDataType<WorkspaceRoomShortType[]>
  >(`/workspaces/${workspace_id}/rooms`, {
    isFetch: rooms.length === 0,
  })
  const items = !!data ? data?.data : []

  useEffect(() => {
    if (items.length > 0) setRooms(items)
  }, [items])

  useSocket("workspaceRoomUpdated", (data) => {
    const room: WorkspaceRoomShortType = data
    setRooms((prev) =>
      prev.map((prevRoom) => {
        if (prevRoom.id === room.id) {
          return room
        }

        return prevRoom
      })
    )
  })

  const handleAddRoom = (room: WorkspaceRoomShortType) => mutate()

  let content = (
    <div className="flex flex-col h-full justify-between items-center">
      <WorkspaceRooms
        workspace_id={+workspace_id}
        rooms={rooms}
        selected_room_id={room_id ? +room_id : undefined}
      />
      <AddRoom workspace_id={workspace_id} onAdd={handleAddRoom} />
    </div>
  )

  if (isLoading) content = <FullLoading />

  return content
}
