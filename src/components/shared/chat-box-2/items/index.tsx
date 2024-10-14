import ChatItem from "./item";
import { useEffect, useRef, useState } from "react";
import { useVirtualizer, Virtualizer } from "@tanstack/react-virtual";
import { Chat2ItemType } from "@/types/chat2";
import FetchingProgress from "./fetching-progress";
import { UserMinimalType } from "@/types/user";
import useBus from "use-bus";
import { _BUS } from "@/app/const/bus";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import UnSeenHandlers from "./un-seen-handlers";

type Props = {
  items: Chat2ItemType[];
  onFetchNewMessages?: () => Promise<void>;
  marginFetching?: number;
  getUser: (user_id: number) => UserMinimalType | undefined;
  onGetVirtualizer?: (vir: Virtualizer<HTMLDivElement, Element>) => void;
};

export default function Items({
  items,
  marginFetching = 1000,
  onFetchNewMessages,
  getUser,
  onGetVirtualizer,
}: Props) {
  const { user: profile } = useProfile();

  const isScrollToTop = useRef(true);
  const parentRef = useRef<HTMLDivElement>(null);

  const latestMessage = useRef<Chat2ItemType>();

  const [isFetching, setIsFetching] = useState(false);

  const messages = [...items].reverse();

  // Virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100, // Estimated height of each message
    measureElement: (el) => el.getBoundingClientRect().height,
  });

  useBus(
    _BUS.scrollEndChatBox,
    () => {
      if (items.length === 0) return;

      // Scroll to the latest message when a new message is added
      rowVirtualizer.scrollToIndex(items.length, {
        align: "end",
        behavior: "smooth",
      });
    },
    [items.length, rowVirtualizer]
  );

  useEffect(() => {
    if (!rowVirtualizer) return;

    if (onGetVirtualizer) onGetVirtualizer(rowVirtualizer);
  }, [onGetVirtualizer, rowVirtualizer]);

  useEffect(() => {
    if (isScrollToTop.current === false) return;

    if (items.length === 0) return;

    rowVirtualizer.scrollToIndex(items.length, {
      align: "end",
    });

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
    <div className='flex-grow relative'>
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
                <ChatItem
                  item={message}
                  key={message.nonce_id}
                  getUser={getUser}
                  isMine={message?.user === profile?.id}
                />
              </div>
            );
          })}
        </div>
      </div>
      <UnSeenHandlers items={items} />
    </div>
  );
}
