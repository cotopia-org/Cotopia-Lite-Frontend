import React, { RefObject } from "react";
import Items from "./items";
import ChatInput from "./input";
import { Chat2ItemType } from "@/types/chat2";
import { UserMinimalType } from "@/types/user";
import { Virtualizer } from "@tanstack/react-virtual";

type Props = {
  items: Chat2ItemType[];
  addMessage?: (text: string) => void;
  onFetchNewMessages?: () => Promise<void>;
  getUser: (user_id: number) => UserMinimalType | undefined;
  onGetVirtualizer?: (vir: Virtualizer<HTMLDivElement, Element>) => void;
};

const Chat2: React.FC<Props> = ({
  items = [],
  addMessage,
  onFetchNewMessages,
  getUser,
  onGetVirtualizer,
}) => {
  return (
    <div className='flex flex-col h-full bg-black/[.04] p-4'>
      {/* Chat message list */}
      <Items
        items={items}
        onFetchNewMessages={onFetchNewMessages}
        marginFetching={300}
        getUser={getUser}
        onGetVirtualizer={onGetVirtualizer}
      />
      {/* Chat input */}
      {addMessage !== undefined && <ChatInput addMessage={addMessage} />}
    </div>
  );
};

export default Chat2;
