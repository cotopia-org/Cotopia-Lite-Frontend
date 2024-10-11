import { Chat2ItemType } from "@/types/chat2";
import ChatUserOverView from "./user-overview";
import ChatItemContent from "./content";
import { UserMinimalType } from "@/types/user";
import { createContext, useContext } from "react";

type Props = {
  item: Chat2ItemType;
  getUser: (user_id: number) => UserMinimalType | undefined;
};

const ChatItemContext = createContext<{
  getUser: (user_id: number) => UserMinimalType | undefined;
}>({ getUser: (user_id) => undefined });

export const useChatItem = () => useContext(ChatItemContext);

export default function ChatItem({ item, getUser }: Props) {
  return (
    <ChatItemContext.Provider value={{ getUser }}>
      <div className={`message-item p-2 flex flex-row items-end gap-x-2`}>
        <ChatUserOverView chat={item} />
        <ChatItemContent chat={item} />
      </div>
    </ChatItemContext.Provider>
  );
}
