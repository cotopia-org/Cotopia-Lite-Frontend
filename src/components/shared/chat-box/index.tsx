import { ChatItemType } from "@/types/chat";
import ChatItem from "./chat-item";
import { useEffect, useRef, useState } from "react";
import { useReachTop } from "@/hooks/use-reach-top";

type Props = {
  items: ChatItemType[];
  observer_user_id?: number;
  onLoadMessage?: () => void;
  fetchNewMessage?: boolean;
};
export default function ChatBox({
  items = [],
  observer_user_id,
  onLoadMessage,
  fetchNewMessage,
}: Props) {
  const [isGetNewMessages, setIsGetNewMessages] = useState(false);

  const boxRef = useRef<HTMLDivElement>();

  const [boxHasScroll, setBoxHasScroll] = useState(false);

  useEffect(() => {
    if (!boxRef?.current) return;
    if (!isGetNewMessages) return;

    boxRef.current.scrollTo({
      top: 10 * 92,
    });
  }, [items?.length, boxRef?.current, isGetNewMessages]);

  useEffect(() => {
    if (!boxRef.current) return;
    if (isGetNewMessages) return;

    const scrollHeight = boxRef.current.scrollHeight;
    const boxHeight = boxRef.current.clientHeight;

    setBoxHasScroll(scrollHeight > boxHeight);

    boxRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  }, [items?.length, boxRef?.current, isGetNewMessages]);

  let clss =
    "relative flex flex-col gap-y-4 h-full max-h-full overflow-y-auto pb-8";

  const { reachTop: isReachTop } = useReachTop(boxRef?.current);
  const { reachTop: isReachTopToFetchChats, diff } = useReachTop(
    boxRef?.current
  );

  const loadMoreMessages = () => {
    if (!boxRef.current) return;

    if (onLoadMessage) {
      onLoadMessage();
      setIsGetNewMessages(true);
    }
  };

  useEffect(() => {
    if (fetchNewMessage === false) {
      return;
    }

    if (diff < 920) {
      loadMoreMessages();
    }
  }, [diff, fetchNewMessage]);

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
        <div className='flex flex-col-reverse w-full gap-y-4'>
          {items.map((chat, key) => (
            <ChatItem
              item={chat}
              observer_user_id={observer_user_id}
              key={key}
            />
          ))}
        </div>
      </div>
    </>
  );
}
