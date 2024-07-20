import { ChatItemType } from "@/types/chat";
import ChatItem from "./chat-item";
import { useEffect, useRef, useState } from "react";
import { useReachTop } from "@/hooks/use-reach-top";
import useBus from "use-bus";
import { _BUS } from "@/app/const/bus";

type Props = {
  items: ChatItemType[];
  observer_user_id?: number;
  onLoadMessage?: () => void;
  fetchNewMessage?: boolean;
  isFetching?: boolean;
};
export default function ChatBox({
  items = [],
  observer_user_id,
  onLoadMessage,
  fetchNewMessage,
  isFetching,
}: Props) {
  const [isGetNewMessages, setIsGetNewMessages] = useState(false);

  const boxRef = useRef<HTMLDivElement>();

  const [boxHasScroll, setBoxHasScroll] = useState(false);
  const [boxScrollHeight, setBoxScrollHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"top" | "down">("top");

  useEffect(() => {
    if (!boxRef.current) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setScrollDirection("top");
      } else {
        setScrollDirection("down");
      }
    };

    boxRef.current.addEventListener("wheel", handleWheel);

    return () => {
      boxRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [boxRef?.current]);

  useEffect(() => {
    if (!boxRef?.current) return;
    if (!isGetNewMessages) return;
  }, [items?.length, boxRef?.current]);

  useBus(
    _BUS.scrollEndChatBox,
    () => {
      if (!boxRef.current) return;

      const scrollHeight = boxRef.current.scrollHeight;
      const boxHeight = boxRef.current.clientHeight;

      setBoxHasScroll(scrollHeight > boxHeight);

      boxRef.current.scrollTo({
        top: scrollHeight,
      });
    },
    [boxRef.current]
  );

  useBus(
    _BUS.scrollToTopNewChatMessages,
    () => {
      setTimeout(() => {
        if (!boxRef.current) return;

        const previousScrollHeight = boxScrollHeight;
        const newScrollHeight = boxRef?.current?.scrollHeight;

        boxRef.current.scrollTo({
          top: newScrollHeight - previousScrollHeight,
          behavior: "instant",
        });
      }, 100);
    },
    [boxRef.current, boxScrollHeight]
  );

  let clss =
    "relative flex flex-col gap-y-4 h-full max-h-full overflow-y-auto pb-8";

  const { reachTop: isReachTop } = useReachTop(boxRef?.current);
  const { reachTop: isReachTopToFetchChats, diff } = useReachTop(
    boxRef?.current
  );

  const loadMoreMessages = () => {
    if (!boxRef.current) return;
    if (scrollDirection === "down") return;

    if (onLoadMessage) {
      setBoxScrollHeight(boxRef?.current.scrollHeight);
      onLoadMessage();
      setIsGetNewMessages(true);
    }
  };

  useEffect(() => {
    if (fetchNewMessage === false) {
      return;
    }

    if (diff < 200) {
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
