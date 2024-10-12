import { ChatType } from "@/types/chat2";
import { createContext, useContext } from "react";
import ChatPreview from "./preview";
import { useSlides } from "../../slide-pusher";
import ChatInnerHolder from "./holder";
import { UserMinimalType } from "@/types/user";

type Props = {
  chat: ChatType;
  getUser: (user_id: number) => UserMinimalType | undefined;
};

//@ts-ignore
const ChatContext = createContext<{ chat: ChatType }>({ chat: undefined });

export const useChat = () => useContext(ChatContext);

export default function Chat({ chat, getUser }: Props) {
  const { push, back } = useSlides();

  return (
    <ChatContext.Provider value={{ chat }}>
      <div
        className='flex flex-row items-center gap-x-4 p-3 hover:bg-black/[.02] cursor-pointer relative'
        onClick={() =>
          push(<ChatInnerHolder onBack={back} chat={chat} getUser={getUser} />)
        }
      >
        <ChatPreview />
      </div>
    </ChatContext.Provider>
  );
}
