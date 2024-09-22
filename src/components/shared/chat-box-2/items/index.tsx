import { MessageType } from "@/types/message";
import ChatItem from "./item";
import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Chat2ItemType } from "@/types/chat2";

type Props = {
  items: Chat2ItemType[];
  onFetchNewMessages?: () => Promise<void>;
  marginFetching?: number;
};

export default function Items({
  items,
  marginFetching = 1000,
  onFetchNewMessages,
}: Props) {
  const isScrollToTop = useRef(true);
  const parentRef = useRef<HTMLDivElement>(null);
  const latestScrollTop = useRef<number>();

  const [isFetching, setIsFetching] = useState(false);

  // Reverse the messages array
  const reversedMessages = [...items].reverse();

  // Virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: reversedMessages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated height of each message
    overscan: 5,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  // Scroll to the last message when the chat mounts or new messages are added
  useEffect(() => {
    if (isScrollToTop.current === false) {
      return;
    }

    rowVirtualizer.scrollToIndex(items.length - 1, { align: "end" });
    isScrollToTop.current = false;
  }, [items.length, rowVirtualizer]);

  // Detect scroll position to fire the onFetchNewMessages event
  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = parentRef.current?.scrollTop || 0;
      const scrollHeight = parentRef.current?.scrollHeight;

      console.log("scrollHeight", scrollHeight);

      // Trigger fetching if the user is within 1000px from the top and not already fetching
      if (scrollTop <= marginFetching && !isFetching && onFetchNewMessages) {
        setIsFetching(true); // Set fetching status
        try {
          latestScrollTop.current = scrollHeight;
          await onFetchNewMessages(); // Fetch new messages
        } finally {
          setIsFetching(false); // Reset fetching status
        }
      }
    };

    const scrollElement = parentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onFetchNewMessages, isFetching, marginFetching]);

  // Restore scroll position after messages are updated
  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;

    const currentScrollHeight = parentRef.current?.scrollHeight;

    if (latestScrollTop.current)
      parentRef.current.scrollTop =
        currentScrollHeight - latestScrollTop.current;
  }, [items.length]);

  return (
    <div
      ref={parentRef}
      className='flex-grow overflow-y-auto mb-4 space-y-2'
      style={{ contain: "strict", height: "100%" }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const message = reversedMessages[virtualRow.index];
          return (
            <div
              data-index={virtualRow.index}
              key={message.id}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: `${virtualRow.start}px`,
                left: 0,
                width: "100%",
              }}
            >
              <ChatItem item={message} key={message.nonce_id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
