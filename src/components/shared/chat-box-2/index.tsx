import React, { useEffect, useState } from "react";
import Items from "./items";
import { MessageType } from "@/types/message";
import ChatInput from "./input";
import { Chat2ItemType } from "@/types/chat2";

type Props = {
  items: Chat2ItemType[];
  addMessage?: (text: string) => void;
  onFetchNewMessages?: () => Promise<void>;
};

const Chat2: React.FC<Props> = ({
  items = [],
  addMessage,
  onFetchNewMessages,
}) => {
  return (
    <div className='flex flex-col h-full'>
      {/* Chat message list */}
      <Items
        items={items}
        onFetchNewMessages={onFetchNewMessages}
        marginFetching={0}
      />
      {/* Chat input */}
      {addMessage !== undefined && <ChatInput addMessage={addMessage} />}
    </div>
  );
};

export default Chat2;
