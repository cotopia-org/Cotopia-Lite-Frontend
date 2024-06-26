import { ChatItemType } from "@/types/chat";
import ChatItem from "./chat-item";
import { useEffect, useRef, useState } from "react";
import { useReachTop } from "@/hooks/use-reach-top";
import { UserType } from "@/types/user";

type Props = {
  items: ChatItemType[];
  observer_user_id?: number;
};
export default function ChatBox({ items = [], observer_user_id }: Props) {
  const boxRef = useRef<HTMLDivElement>();

  const [boxHasScroll, setBoxHasScroll] = useState(false);

  useEffect(() => {
    if (!boxRef.current) return;

    const scrollHeight = boxRef.current.scrollHeight;
    const boxHeight = boxRef.current.clientHeight;

    setBoxHasScroll(scrollHeight > boxHeight);

    boxRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  }, [items?.length, boxRef?.current]);

  let clss =
    "relative flex flex-col gap-y-4 h-full max-h-full overflow-y-auto pb-8";

  const isReachTop = useReachTop(boxRef?.current);

  if (items.length === 0) return;

  return (
    <>
      {!!boxHasScroll && !isReachTop && (
        <div className='absolute top-[32px] left-0 h-[32px] z-10 bg-gradient-to-b from-white to-transparent w-full flex'></div>
      )}
      <div
        className={clss}
        ref={(xref) => {
          if (xref === null) return;

          boxRef.current = xref;
        }}
      >
        {items.map((chat, key) => (
          <ChatItem item={chat} observer_user_id={observer_user_id} key={key} />
        ))}
      </div>
    </>
  );
}
