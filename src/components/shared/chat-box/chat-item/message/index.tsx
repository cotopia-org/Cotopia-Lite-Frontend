import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import { useChatRoomCtx } from "@/context/chat-room-context";
import {
  unreadMessagesAction,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice";
import { useAppDispatch } from "@/store/redux/store";
import { ChatItemType } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import Linkify from "react-linkify";

type Props = {
  isMine: boolean;
  item: ChatItemType;
};
export default function Message({ item, isMine }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  const isDirect = item?.is_direct;

  let channel = `room-${item.room_id}`;
  if (isDirect) {
    channel = `direct-${item.room_id}`;
  }

  const appDispatch = useAppDispatch();

  const socket = useSocket();
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
      if (socket) {
        socket.emit("seenMessage", {
          message: item,
          nonce_id: item.nonce_id,
          room_id: item.room_id,
          channel,
        });

        appDispatch(updateMessagesAction({ message: { ...item, seen: true } }));
      }
    }
    if (isVisible) {
      appDispatch(unreadMessagesAction({ message: item, messageType: "seen" }));
    }
  }, [item, isVisible, isMine, socket]);

  return (
    <div
      className='text-wrap mb-3 w-full'
      dir='auto'
      style={{ overflowWrap: "break-word" }}
      ref={divRef}
    >
      <Linkify
        componentDecorator={(
          decoratedHref: string,
          decoratedText: string,
          key: number
        ) => (
          <a
            href={decoratedHref}
            key={key}
            target='_blank'
            className='text-blue-600 hover:underline whitespace-pre-wrap'
            style={{
              overflowWrap: "break-word",
            }}
          >
            {decoratedText}
          </a>
        )}
      >
        {item?.text}
      </Linkify>
    </div>
  );
}
