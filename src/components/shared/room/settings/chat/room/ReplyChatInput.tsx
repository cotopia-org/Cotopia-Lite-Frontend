"use client"

import { _BUS } from "@/app/const/bus"
import ReplyedMessageInfo from "@/components/shared/chat-box/chat-item/TargetMessageAction/ReplyMessageInfo"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import { useChatCtx } from "@/context/chat-context"
import { ChatItemType } from "@/types/chat"

interface Props {
  message: ChatItemType
  onAdd: (message: string) => void
}

const ReplyChatInput = ({ message, onAdd }: Props) => {
  const { text, user, id } = message

  const { changeBulk } = useChatCtx()

  const closeReplyHandler = () => {
    changeBulk({ message: null, type: undefined })
  }

  const selectedMessageNode = (
    <ReplyedMessageInfo
      messageId={id}
      title={`Reply to ${user.username}`}
      desc={text}
      onClose={closeReplyHandler}
    />
  )

  return <ChatUserInput onAdd={onAdd} beforeNode={selectedMessageNode} />
}

export default ReplyChatInput
