import { Chat2ItemType } from "@/types/chat2";
import ChatUserOverView from "./user-overview";
import ChatItemContent from "./content";
import { UserMinimalType } from "@/types/user";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useChat2 } from "@/hooks/chat/use-chat-2";

type Props = {
  item: Chat2ItemType;
  getUser: (user_id: number) => UserMinimalType | undefined;
  isMine?: boolean;
};

const ChatItemContext = createContext<{
  getUser: (user_id: number) => UserMinimalType | undefined;
}>({ getUser: (user_id) => undefined });

export const useChatItem = () => useContext(ChatItemContext);

export default function ChatItem({ item, getUser, isMine }: Props) {
  const { seen } = useChat2();

  const divRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  useEffect(() => {
    //Should remove item.nonce_id !== 0 in the feuture (just for legacy messages)
    if (isVisible && item?.seen === false && item.nonce_id !== 0 && !isMine) {
      seen(item);
    }
  }, [item, isVisible, isMine, seen]);

  return (
    <ChatItemContext.Provider value={{ getUser }}>
      <div
        ref={divRef}
        className={`message-item p-2 flex flex-row items-end gap-x-2`}
      >
        <ChatUserOverView chat={item} />
        <ChatItemContent chat={item} />
      </div>
    </ChatItemContext.Provider>
  );
}
