import { ChatType } from "@/types/chat2";
import { createContext, useContext } from "react";
import ChatPreview from "./preview";
import ChatDetails from "./details";

type Props = {
  chat: ChatType;
};

//@ts-ignore
const ChatContext = createContext<{ chat: ChatType }>({ chat: undefined });

export const useChat = () => useContext(ChatContext);

export default function Chat({ chat }: Props) {
  return (
    <ChatContext.Provider value={{ chat }}>
      <div className='flex flex-row items-center gap-x-4 p-3 hover:bg-black/[.02] cursor-pointer'>
        <ChatPreview />
        <ChatDetails />
      </div>
    </ChatContext.Provider>
  );
}
