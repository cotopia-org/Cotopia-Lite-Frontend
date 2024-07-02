import { useChat } from "@/hooks/chat/use-chat";
import { ChatItemType } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

type Props = {
  item: ChatItemType;
};
export default function Message({ item }: Props) {
  const [stateMessage, setStateMessage] = useState(item);
  useEffect(() => {
    if (item !== undefined) setStateMessage(item);
  }, [item]);

  const divRef = useRef<HTMLDivElement>();

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

  const { seenMessage } = useChat();

  useEffect(() => {
    if (isVisible && stateMessage?.seen === false) {
      seenMessage(stateMessage?.id).then((res) => {
        setStateMessage({
          ...stateMessage,
          seen: true,
        });
      });
    }
  }, [stateMessage, isVisible]);

  return (
    <p
      className='text-wrap'
      style={{
        overflowWrap: "anywhere",
      }}
      ref={(x) => {
        if (x !== null) divRef.current = x;
      }}
    >
      {item?.text}
    </p>
  );
}
