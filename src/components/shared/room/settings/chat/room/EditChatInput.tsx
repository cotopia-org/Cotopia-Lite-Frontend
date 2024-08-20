"use client"

import { _BUS } from "@/app/const/bus"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import EditMessageInfo from "@/components/shared/chat-box/chat-item/TargetMessageAction/EditMessageInfo"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import { useChatCtx } from "@/context/chat-context"
import { ChatItemType } from "@/types/chat"

interface Props {
  message: ChatItemType
  onAdd: (message: string) => void
}

const EditChatInput = ({ message, onAdd }: Props) => {
  const { text, id } = message

  const { changeBulk } = useChatCtx()

  const closeReplyHandler = () => {
    changeBulk({ message: null, type: undefined })
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
