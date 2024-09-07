import CBadge from "@/components/shared-ui/c-badge"
import React from "react"
import { useAppSelector } from "@/store/redux/store"

export default function DirectTabTitle() {
  const roomSlice = useAppSelector((state) => state.roomSlice)
  const messageCounts = roomSlice?.messages_count ?? { room: [], directs: {} }
  const isDirectChecked = roomSlice?.isDirectChecked ?? false

  const directsCount = Object?.values(messageCounts.directs).flatMap(
    (item) => item
  ).length

  return (
    <div className="flex flex-row items-center gap-x-2">
      <span>Directs</span>
      {!isDirectChecked && <CBadge count={directsCount} size="normal" />}
    </div>
  )
}
