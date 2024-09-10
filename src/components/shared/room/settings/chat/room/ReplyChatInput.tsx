"use client"

import { _BUS } from "@/app/const/bus"
import ReplyedMessageInfo from "@/components/shared/chat-box/chat-item/TargetMessageAction/ReplyMessageInfo"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import MentionableChatInput from "@/components/shared/chat-box/user-input/mentionable-chat-input"
import { useChatRoomCtx } from "@/context/chat-room-context"
import { MessagePayloadType } from "@/hooks/chat/use-chat-socket"
import { ChatItemType } from "@/types/chat"

interface Props {
  message: ChatItemType
  onAdd: (payload: MessagePayloadType) => void
}

const ReplyChatInput = ({ message, onAdd }: Props) => {
  const { text, user } = message

  const { changeBulk } = useChatRoomCtx()

  const closeReplyHandler = () => {
    changeBulk({ targetMessage: null, flag: undefined })
  }

  const selectedMessageNode = (
    <ReplyedMessageInfo
      title={`Reply to ${user?.username}`}
      desc={text}
      onClose={closeReplyHandler}
    />
  )

  return <MentionableChatInput onAdd={onAdd} beforeNode={selectedMessageNode} />
}

export default ReplyChatInput
