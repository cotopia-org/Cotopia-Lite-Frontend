"use client"

import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import CotopiaPrompt from "@/components/shared-ui/c-prompt"
import { useChatRoomCtx } from "@/context/chat-room-context"
import { useChat } from "@/hooks/chat/use-chat"
import { useChatSocket } from "@/hooks/chat/use-chat-socket"
import useLoading from "@/hooks/use-loading"
import { removeMessageAction } from "@/store/redux/slices/room-slice"
import { useAppDispatch } from "@/store/redux/store"

import { ChatItemType } from "@/types/chat"
import { useCallback } from "react"
import { toast } from "sonner"

interface Props {
  message: ChatItemType
  onClose: () => void
}

const DeleteMessageAction = ({ message, onClose }: Props) => {
  const { user } = useProfile()
  const { roomId, env } = useChatRoomCtx()

  const { remove } = useChatSocket(roomId, user, env)

  const appDispatch = useAppDispatch()

  const deleteMessageHandler = useCallback(async () => {
    try {
      await remove({ message })
      onClose()
    } catch (error) {}
  }, [message, onClose, appDispatch])

  return (
    <CotopiaPrompt
      open
      title="Delete Message"
      submitText="Delete"
      description="Do you want to delete this message?"
      onSubmit={deleteMessageHandler}
      onClose={onClose}
      isPortal={false}
    />
  )
}

export default DeleteMessageAction
