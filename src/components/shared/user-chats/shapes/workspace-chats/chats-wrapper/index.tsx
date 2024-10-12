import { useRoomContext } from "@/components/shared/room/room-context";
import { useChat2 } from "@/hooks/chat/use-chat-2";
import { useCallback, useMemo } from "react";
import Chat from "../../../chat";
import FullLoading from "@/components/shared/full-loading";

export default function ChatsWrapper() {
  const { workspace_id } = useRoomContext();

  //@ts-ignore
  const { chats, loading, participants } = useChat2({ workspace_id });

  const loadUserByUserId = useCallback(
    (user_id: number) => {
      const user = participants.find((x) => x.id === user_id);

      return user;
    },
    [participants]
  );

  const chatSortedByLastMessage = useMemo(() => {
    return chats.sort(
      (a, b) => b?.last_message?.nonce_id - a?.last_message?.nonce_id
    );
  }, [chats]);

  let content = (
    <div className='w-full chats-holder flex flex-col gap-y-0'>
      {chatSortedByLastMessage.map((chat) => (
        <Chat getUser={loadUserByUserId} chat={chat} key={chat?.id} />
      ))}
    </div>
  );

  if (loading) content = <FullLoading />;

  return content;
}
