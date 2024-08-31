"use client"

import { _BUS } from "@/app/const/bus"
import FullLoading from "@/components/shared/full-loading"
import { UserMinimalType } from "@/types/user"
import DirectChatBox from "."
import { useChatRoomCtx } from "@/context/chat-room-context"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import EditChatInput from "../../room/EditChatInput"
import ReplyChatInput from "../../room/ReplyChatInput"

interface Props {
  user?: UserMinimalType
  onBack: () => void
}

const RoomDirectEnv = ({ onBack, user }: Props) => {
  const {
    onAddMessage,
    flag,
    targetMessage,
    onEditMessage,
    onReplyMessage,
    messages,
    loading,
  } = useChatRoomCtx()

  let chatInputNode = <ChatUserInput onAdd={onAddMessage} />

  if (flag === "edit" && targetMessage) {
    chatInputNode = (
      <EditChatInput message={targetMessage} onAdd={onEditMessage} />
    )
  }
  if (flag === "reply" && targetMessage) {
    chatInputNode = (
      <ReplyChatInput message={targetMessage} onAdd={onReplyMessage} />
    )
  }

  let content = null

  if (loading) content = <FullLoading />

  if (!loading && !!messages)
    content = (
      <DirectChatBox
        inputNode={chatInputNode}
        messages={messages}
        onAdd={() => {}}
        user={user}
        onBack={onBack}
      />
    )

  return content
}

export default RoomDirectEnv
