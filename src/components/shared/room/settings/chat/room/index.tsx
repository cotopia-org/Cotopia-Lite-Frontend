import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import FullLoading from "@/components/shared/full-loading"
import { _BUS } from "@/app/const/bus"
import EditChatInput from "./EditChatInput"
import ReplyChatInput from "./ReplyChatInput"
import { useChatRoomCtx } from "@/context/chat-room-context"
import NewChatBox from "@/components/shared/chat-box/NewChatBox"
import MentionableChatInput from "@/components/shared/chat-box/user-input/mentionable-chat-input"

export default function UserChatRoom() {
  const { user } = useProfile()

  const {
    loading,
    messages,
    flag,
    targetMessage,
    onEditMessage,
    onReplyMessage,
    onAddMessage,
  } = useChatRoomCtx()

  let chatInputNode = <MentionableChatInput onAdd={onAddMessage} />

  if (flag === "edit" && targetMessage) {
    chatInputNode = (
      <EditChatInput
        message={targetMessage}
        onAdd={(payload) => onEditMessage({ ...targetMessage, ...payload })}
      />
    )
  }

  if (flag === "reply" && targetMessage) {
    chatInputNode = (
      <ReplyChatInput message={targetMessage} onAdd={onReplyMessage} />
    )
  }

  let chatBxClss = "min-h-[calc(100%-30px)]"

  if (messages?.length === 0) {
    chatBxClss += " items-center justify-center"
  }

  let content = (
    <>
      <NewChatBox
        className="min-h-[calc(100%-60px)] items-center justify-center"
        observer_user_id={user?.id}
      />
      {chatInputNode}
    </>
  )

  if (loading) content = <FullLoading />

  return (
    <div className="relative h-full flex flex-col gap-y-2 justify-between">
      {content}
    </div>
  )
}
