import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { MessagesSquare } from "lucide-react"
import { useRoomContext } from "../../../room-context"
import CBadge from "@/components/shared-ui/c-badge"
import { useAppSelector } from "@/store/redux/store"

export default function UserChatsSettingsButtonTool() {
  const { openSidebar, closeSidebar, sidebar } = useRoomContext()
  const handleOpenChat = () => {
    if (sidebar) {
      closeSidebar()
    } else {
      openSidebar(<></>)
    }
  }

  const roomSlice = useAppSelector((state) => state.roomSlice)

  const messages = roomSlice?.messages_count?.room ?? []

  return (
    <div className="relative">
      <CBadge
        count={messages.length}
        showAnimate={false}
        className="absolute right-1/2 text-xs top-[-10px] z-[2] translate-x-1/2"
        size="small"
      />
      <CotopiaIconButton className="text-black" onClick={handleOpenChat}>
        <MessagesSquare />
      </CotopiaIconButton>
    </div>
  )
}
