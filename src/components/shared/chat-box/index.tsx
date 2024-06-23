import { ChatItemType } from "@/types/chat";
import ChatItem from "./chat-item";
import { useEffect, useRef } from "react";

type Props = {
  items: ChatItemType[];
};
export default function ChatBox({ items = [] }: Props) {
  const boxRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!boxRef.current) return;

    boxRef.current.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [items?.length, boxRef?.current]);

  if (items.length === 0) return;

  return (
    <div
      className='flex flex-col gap-y-4 h-full max-h-full overflow-y-auto pb-8'
      ref={(xref) => {
        if (xref === null) return;

        boxRef.current = xref;
      }}
    >
      {items.map((chat, key) => (
        <ChatItem item={chat} key={key} />
      ))}
    </div>
  );
}
