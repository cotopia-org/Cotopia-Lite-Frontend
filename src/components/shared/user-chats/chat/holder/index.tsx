import React, { useCallback, useEffect, useRef } from "react";
import { ChatType } from "@/types/chat2";
import BackHolder from "./back";
import ChatDetails from "../details";
import Chat2 from "@/components/shared/chat-box-2";
import { useChat2 } from "@/hooks/chat/use-chat-2";
import { UserMinimalType } from "@/types/user";
import { Virtualizer } from "@tanstack/react-virtual";
import { useAppDispatch } from "@/store/redux/store";
import { getChatMessages } from "@/store/redux/slices/chat-slice";
import FullLoading from "@/components/shared/full-loading";

type Props = {
  chat: ChatType;
  onBack: () => void;
  getUser: (user_id: number) => UserMinimalType | undefined;
};

export default function ChatInnerHolder({ chat, onBack, getUser }: Props) {
  const chatRef = useRef<Virtualizer<HTMLDivElement, Element>>();

  const { chatObjects, send } = useChat2({ chat_id: chat.id });

  const chatMessages = chatObjects?.[chat.id]?.messages ?? [];

  const handleSendMessage = useCallback((text: string) => {
    send({ text });
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChatMessages({ chat_id: chat.id }));
  }, [chat?.id]);

  const { loading } = useChat2();

  if (loading) return <FullLoading />;

  return (
    <div className='flex flex-col gap-y-2 w-full h-[calc(100vh-132px)]'>
      <div className='flex flex-row items-center gap-x-2'>
        <BackHolder onClick={onBack} />
        <ChatDetails title={chat.title} description={`Chat description`} />
      </div>
      <Chat2
        items={chatMessages}
        addMessage={handleSendMessage}
        getUser={getUser}
        onGetVirtualizer={(vir) => (chatRef.current = vir)}
      />
    </div>
  );
}
