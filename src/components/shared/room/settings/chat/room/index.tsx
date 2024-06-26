import ChatBox from "@/components/shared/chat-box";
import ChatUserInput from "@/components/shared/chat-box/user-input";
import { useChat } from "@/hooks/chat/use-chat";
import { ChatItemType } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";
import { useRoomContext } from "../../../room-context";
import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { MessageType } from "@/types/message";
import { FetchDataType } from "@/lib/axios";
import { useApi } from "@/hooks/swr";
import FullLoading from "@/components/shared/full-loading";

export default function UserChatRoom() {
  const { user } = useProfile();
  const { room_id } = useRoomContext();

  const { data, isLoading } = useApi<FetchDataType<any[]>>(
    `/rooms/${room_id}/messages?page=3`
  );
  const items: MessageType[] = !!data ? data?.data : [];

  const [messages, setMessages] = useState<ChatItemType[]>([]);
  useEffect(() => {
    setMessages(items ?? []);
  }, [items?.length]);

  const { sendToRoom } = useChat();

  const handleAddMessage = useCallback(
    async (text: string) => {
      if (!room_id) return;

      try {
        const message = await sendToRoom(text, room_id);
        if (message) {
          setMessages((prev) => [...prev, message]);
        }
      } catch (e) {}
    },
    [room_id]
  );

  useSocket("roomMessages", (data: MessageType) => {
    setMessages((prev) => [...prev, data]);
  });

  let content = (
    <>
      <ChatBox items={messages} observer_user_id={user?.id} />
      <ChatUserInput onAdd={handleAddMessage} />
    </>
  );

  if (data === undefined || isLoading) content = <FullLoading />;

  return (
    <div className='relative h-full flex flex-col justify-between  pt-8'>
      {content}
    </div>
  );
}
