import ChatBox from "@/components/shared/chat-box";
import ChatUserInput from "@/components/shared/chat-box/user-input";
import { ChatItemType } from "@/types/chat";
import moment from "moment";
import React, { useCallback, useState } from "react";

export default function UserChatRoom() {
  const [messages, setMessages] = useState<ChatItemType[]>([
    {
      id: "4215215151251212",
      date: moment().unix(),
      username: "mahdi.dev",
      message: "Hi",
    },
  ]);

  const handleAddMessage = useCallback((message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random() * 10000000000000,
        date: moment().unix(),
        username: "mahdi.dev",
        message,
      },
    ]);
  }, []);

  return (
    <div className='h-full flex flex-col justify-between gap-y-2 pt-8'>
      <ChatBox items={messages} />
      <ChatUserInput onAdd={handleAddMessage} />
    </div>
  );
}
