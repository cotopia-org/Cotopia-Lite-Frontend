import CBadge from "@/components/shared-ui/c-badge"
import React from "react"
import { useAppSelector } from "@/store/redux/store"

export default function TabRoomTitle() {
  const roomSlice = useAppSelector((state) => state.roomSlice)
  const messageCounts = roomSlice?.messages_count ?? { room: [], directs: {} }
  const isRoomChecked = roomSlice?.isRoomChecked ?? false

  return (
    <div className="flex flex-row items-center gap-x-2">
      <span>Room</span>
      {!isRoomChecked && (
        <CBadge count={messageCounts.room.length} size="normal" />
      )}
    </div>
  )
}
