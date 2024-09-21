import React, { useEffect, useState } from "react";
import Items from "./items";
import { MessageType } from "@/types/message";
import ChatInput from "./input";

type Props = {
  items: MessageType[];
  addMessage?: (text: string) => void;
  onFetchNewMessages?: () => Promise<void>;
};

const Chat2: React.FC<Props> = ({
  items = [],
  addMessage,
  onFetchNewMessages,
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    if (items !== undefined) setMessages(items);
  }, [items]);

  return (
    <div className='flex flex-col h-full bg-gray-100 p-4'>
      {/* Chat message list */}
      <Items items={messages} onFetchNewMessages={onFetchNewMessages} />
      {/* Chat input */}
      {addMessage !== undefined && <ChatInput addMessage={addMessage} />}
    </div>
  );
};

export default Chat2;
