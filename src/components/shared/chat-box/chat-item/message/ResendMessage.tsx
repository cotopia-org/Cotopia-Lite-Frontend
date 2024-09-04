"use client"
import CotopiaButton from "@/components/shared-ui/c-button"
import {
  RoomEnvironmentType,
  useChatRoomCtx,
} from "@/context/chat-room-context"
import { useAppSelector } from "@/store/redux/store"
import { ChatItemType } from "@/types/chat"
import { UserMinimalType } from "@/types/user"
import { LoaderCircle, CircleAlert } from "lucide-react"
import React from "react"
import colors from "tailwindcss/colors"

interface Props {
  message: ChatItemType
  user?: UserMinimalType
}

const ResendMessage = ({ message, user }: Props) => {
  const { roomId, onAddMessage, env } = useChatRoomCtx()

  const roomSlice = useAppSelector((store) => store.roomSlice)
  const chatRoom = roomSlice?.chatRoom ?? {}

  if (roomId === undefined || chatRoom === undefined) return null

  let userId = undefined

  if (env === RoomEnvironmentType.direct) userId = user?.id

  const resendLoading = chatRoom?.[roomId]?.resend_loading

  let iconNode = <CircleAlert color={colors.red[500]} size={16} />

  if (resendLoading) {
    iconNode = (
      <LoaderCircle
        color={colors.red[500]}
        size={16}
        className="animate-spin"
      />
    )
  }

  return (
    <CotopiaButton
      loading={false}
      variant={"ghost"}
      onClick={() => onAddMessage(message.text, userId, true)}
      endIcon={iconNode}
      className="hover:bg-transparent !p-0"
    >
      <span className="text-sm text-destructive font-medium">
        Resend Message
      </span>
    </CotopiaButton>
  )
}

export default ResendMessage
