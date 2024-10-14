"use client";
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import {
  unreadMessagesAction,
  updateMessagesAction,
} from "@/store/redux/slices/room-slice";
import { useAppDispatch } from "@/store/redux/store";
import { ChatItemType } from "@/types/chat";
import { useEffect, useRef, useState } from "react";
import Linkify from "linkify-react";

import "linkify-plugin-mention";

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
      }
    }
    if (isVisible) {
      appDispatch(unreadMessagesAction({ message: item, messageType: "seen" }));
    }
  }, [item, isVisible, isMine, socket]);

  const linkElement = (
    attributes: { [attr: string]: any },
    content: string,
    type: "mention" | "link"
  ) => {
    let clss = "text-blue-600 whitespace-pre-wrap";
    if (type === "link") {
      clss += " hover:underline";
    }

    let view = content;

    return (
      <a
        className={clss}
        style={{
          overflowWrap: "break-word",
        }}
        target={type === "link" ? "_blank" : "_self"}
        {...attributes}
      >
        {view}
      </a>
    );
  };

  return (
    <div
      className='text-wrap mb-3 w-full'
      dir='auto'
      style={{ overflowWrap: "break-word" }}
      ref={divRef}
    >
      <Linkify
        options={{
          nl2br: true,
          render: {
            url: ({ attributes, content }) =>
              linkElement(attributes, content, "link"),
            mention: ({ attributes, content }) =>
              linkElement(attributes, content, "mention"),
          },
          formatHref: {
            mention: () => "#",
          },
        }}
      >
        {item.text}
      </Linkify>
    </div>
  );
}
