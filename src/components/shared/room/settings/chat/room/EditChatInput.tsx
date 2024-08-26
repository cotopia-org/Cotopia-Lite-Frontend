"use client"

import { _BUS } from "@/app/const/bus"
import EditMessageInfo from "@/components/shared/chat-box/chat-item/TargetMessageAction/EditMessageInfo"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import { useChatRoomCtx } from "@/context/chat-room-context"
import { ChatItemType } from "@/types/chat"

interface Props {
  message: ChatItemType
  onAdd: (message: string) => void
}

const EditChatInput = ({ message, onAdd }: Props) => {
  const { text, id } = message

  const { changeBulk } = useChatRoomCtx()

  const closeReplyHandler = () => {
    changeBulk({ targetMessage: null, flag: undefined })
  }

  const selectedMessageNode = (
    <EditMessageInfo
      messageId={id}
      title={`Edit on`}
      desc={text}
      onClose={closeReplyHandler}
    />
  )

  return (
    <ChatUserInput
      defaultValue={message.text}
      onAdd={onAdd}
      beforeNode={selectedMessageNode}
    />
  )
}

export default EditChatInput
