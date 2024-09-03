import ChatUserInput from "@/components/shared/chat-box/user-input";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import FullLoading from "@/components/shared/full-loading";
import { _BUS } from "@/app/const/bus";
import EditChatInput from "./EditChatInput";
import ReplyChatInput from "./ReplyChatInput";
import NotFound from "@/components/shared/layouts/not-found";
import { useChatRoomCtx } from "@/context/chat-room-context";
import NewChatBox from "@/components/shared/chat-box/NewChatBox";

export default function UserChatRoom() {
  const { user } = useProfile();

  const {
    loading,
    messages,
    flag,
    targetMessage,
    onAddMessage,
    onEditMessage,
    onReplyMessage,
  } = useChatRoomCtx();

  let chatInputNode = <ChatUserInput onAdd={onAddMessage} />;

  if (flag === "edit" && targetMessage) {
    chatInputNode = (
      <EditChatInput message={targetMessage} onAdd={onEditMessage} />
    );
  }

  if (flag === "reply" && targetMessage) {
    chatInputNode = (
      <ReplyChatInput message={targetMessage} onAdd={onReplyMessage} />
    );
  }
  let content = null;

  let chatBxClss = "min-h-[calc(100%-30px)]";

  if (messages?.length === 0) {
    chatBxClss += " items-center justify-center";
  }

  if (messages && messages?.length > 0) {
    content = (
      <>
        <NewChatBox
          className='min-h-[calc(100%-60px)] items-center justify-center'
          observer_user_id={user?.id}
        />
        {chatInputNode}
      </>
    );
  }

  if (messages?.length === 0)
    content = <NotFound title='Messages not found!' />;
  if (loading) content = <FullLoading />;

  return (
    <div className='relative h-full flex flex-col gap-y-2 justify-between'>
      {content}
    </div>
  );
}
