import ChatItem from "./item";
import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Chat2ItemType } from "@/types/chat2";
import FetchingProgress from "./fetching-progress";

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
  const latestMessage = useRef<Chat2ItemType>();

  const [isFetching, setIsFetching] = useState(false);

  const messages = [...items].reverse();

  // Virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Estimated height of each message
    overscan: 5,
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  useEffect(() => {
    if (isScrollToTop.current === false) return;

    if (items.length === 0) return;

    rowVirtualizer.scrollToIndex(items.length, { align: "end" });

    isScrollToTop.current = false;
  }, [items.length, rowVirtualizer]);

  // Detect scroll position to fire the onFetchNewMessages event
  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = parentRef.current?.scrollTop || 0;

      // Trigger fetching if the user is within 1000px from the top and not already fetching
      if (scrollTop <= marginFetching && !isFetching && onFetchNewMessages) {
        setIsFetching(true); // Set fetching status
        try {
          latestMessage.current = items[items.length - 1];
          await onFetchNewMessages(); // Fetch new messages
        } finally {
          setTimeout(() => {
            setIsFetching(false);
          }, 2000);
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
  }, [onFetchNewMessages, isFetching, marginFetching, rowVirtualizer]);

  useEffect(() => {
    if (!!!latestMessage.current) return;

    const itemIndex = items.findIndex(
      (x) => x.id === latestMessage.current?.id
    );

    if (itemIndex === -1) return;

    rowVirtualizer.scrollToIndex(items.length - (itemIndex + 1), {
      align: "start",
    });

    setIsFetching(false);
  }, [items.length, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className='relative flex-grow overflow-y-auto mb-4 space-y-2'
      style={{ contain: "strict", height: "100%" }}
    >
      {!!isFetching && <FetchingProgress />}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index];
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
