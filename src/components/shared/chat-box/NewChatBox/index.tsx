import { ChatItemType } from "@/types/chat";
import { UIEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { _BUS } from "@/app/const/bus";
import useBus from "use-bus";
import {
  FetchMessageType,
  RoomEnvironmentType,
  UPPER_LIMIT_PAGE,
  useChatRoomCtx,
} from "@/context/chat-room-context";
import { ChevronDown } from "lucide-react";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { toast } from "sonner";
import { __VARS } from "@/app/const/vars";
import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import { getFocusedMessage, getMiddleIndex } from "@/lib/utils";
import NotFound from "../../layouts/not-found";
import FullLoading from "../../full-loading";
import RowItem from "./RowItem";
import { getInitMessages } from "@/store/redux/slices/room-slice";
import CBadge from "@/components/shared-ui/c-badge";

type Props = {
  observer_user_id?: number;
  className?: string;
};

export const SCROLL_THRESHOLD = 200;

function NewChatBox({ observer_user_id, className = "" }: Props) {
  let clss = "relative";

  const [wheelDirection, setWheelDirections] = useState<"down" | "up">("down");

  const {
    messages,
    loadMoreMessages: onLoadMessage,
    originMessage,
    upperLimit,
    downLimit,
    flag,
    navigateLoading,
    env,
    changeKey,
    changeBulk,
    roomId,
  } = useChatRoomCtx();

  if (roomId === undefined) return null;

  const prevFetchRef = useRef<boolean>(true);
  const nextFetchRef = useRef<boolean>(true);
  const totalLength = (__VARS.defaultPerPage / 2) * __VARS.pagesLimitDiff;
  const [isFirst, setIsFirst] = useState(true);

  const appDispatch = useAppDispatch();
  const [showGotoBottom, setShowGotoBottom] = useState(false);

  const roomSlice = useAppSelector((state) => state.roomSlice);

  const nextLoading = roomSlice?.nextLoading ?? false;
  const prevLoading = roomSlice?.prevLoading ?? false;

  const unreadRoomMsgs = roomSlice?.messages_count ?? {
    room: [],
    directs: {},
  };

  const unreadDmMsgs = unreadRoomMsgs.directs?.[roomId] ?? [];

  let unreadMsgsLength = 0;

  if (env === RoomEnvironmentType.room) {
    unreadMsgsLength = unreadRoomMsgs.room.length;
  }
  if (env === RoomEnvironmentType.direct) {
    unreadMsgsLength = unreadDmMsgs.length;
  }

  useEffect(() => {
    setTimeout(() => {
      if (!scrollerRef.current) return;
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: "instant",
      });
    }, 200);
  }, []);

  const isFirstView = upperLimit === __VARS.pagesLimitDiff;

  let finalMsg = [...(messages as ChatItemType[])].reverse();

  const startMessageIndex = isFirstView
    ? finalMsg.length - 1
    : getMiddleIndex(totalLength);

  const virtousoRef = useRef<VirtuosoHandle>(null);
  const scrollerRef = useRef<HTMLDivElement>();

  const backToBottom = (type: "smooth" | "instant" = "smooth") => {
    if (scrollerRef?.current)
      virtousoRef.current?.scrollTo({
        top:
          scrollerRef.current?.scrollHeight + scrollerRef.current?.clientHeight,
        behavior: type,
      });
  };

  const backToMessageHandler = useCallback(async () => {
    if (!!originMessage && flag === "reply") {
      const findedIndex = finalMsg.findIndex(
        (msg) => msg.id === originMessage.id
      );
      changeBulk({ flag: undefined, originMessage: undefined });

      if (findedIndex >= 0) {
        virtousoRef.current?.scrollToIndex({
          index: findedIndex,
          align: "end",
          behavior: "smooth",
        });
      } else {
        if (originMessage === undefined || messages === undefined)
          return toast.error("Origin message not found");
        try {
          let finded = false;
          let ul = upperLimit;
          let dl = downLimit;
          const flatIndex = totalLength - __VARS.defaultPerPage;
          let finalItems: ChatItemType[] = [...messages].reverse();
          changeKey({
            key: "navigateLoading",
            value: true,
          });
          while (!finded) {
            const { items } = await onLoadMessage(
              FetchMessageType.Prev,
              ul,
              dl
            );
            ul--;
            dl--;
            virtousoRef.current?.scrollToIndex({
              index: 30,
              behavior: "auto",
              align: "center",
            });

            let newItems = [];
            if (ul === __VARS.pagesLimitDiff) {
              newItems = [...items].reverse();
            } else {
              newItems = [
                ...items,
                ...finalItems.slice(0, flatIndex),
              ].reverse();
            }
            finalItems = [...newItems].reverse();
            const findedIndex = newItems.findIndex(
              (msg) => msg.id === originMessage.id
            );
            if (findedIndex >= 0 || ul < __VARS.pagesLimitDiff) {
              changeKey({ key: "navigateLoading", value: false });
              finded = true;
              virtousoRef.current?.scrollToIndex({
                index: findedIndex,
                behavior: "auto",
                align: "center",
              });
              break;
            } else {
              await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust delay as needed
            }
          }
        } catch (error) {}
      }
    } else if (downLimit > 1) {
      if (roomId === undefined) return;
      await appDispatch(
        getInitMessages({
          has_loading: false,
          room_id: roomId,
          upper_limit: UPPER_LIMIT_PAGE,
        })
      );
      backToBottom("instant");
    } else {
      backToBottom();
    }
    setShowGotoBottom(false);
  }, [
    finalMsg,
    originMessage,
    downLimit,
    roomId,
    showGotoBottom,
    totalLength,
    upperLimit,
  ]);

  let backToFromNode = null;

  if (showGotoBottom) {
    backToFromNode = (
      <div className='absolute bottom-5 z-[5] right-5 animate-bounce'>
        <CBadge
          count={unreadMsgsLength}
          showAnimate={false}
          className='absolute right-1/2 text-xs top-[-10px] z-[2] translate-x-1/2'
          size='small'
        />
        <CotopiaIconButton
          onClick={backToMessageHandler}
          className='w-8 h-8 shadow-md opacity-50 hover:!opacity-100 !bg-primary right-5 '
        >
          <ChevronDown />
        </CotopiaIconButton>
      </div>
    );
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsFirst(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!nextFetchRef.current) {
      nextFetchRef.current = true;
    }
  }, [upperLimit]);

  useEffect(() => {
    if (!prevFetchRef.current) {
      prevFetchRef.current = true;
    }
  }, [downLimit]);

  const loadMoreMessages = useCallback(
    async (type: FetchMessageType, targetIdx: number) => {
      if (!scrollerRef.current) return;
      const { items } = await onLoadMessage(type);
      if (items.length === 0) return;
      virtousoRef?.current?.scrollToIndex({
        index: targetIdx,
        align: "center",
      });
    },
    [onLoadMessage, virtousoRef.current, scrollerRef.current]
  );

  useBus(
    _BUS.scrollEndChatBox,
    (data) => {
      setTimeout(() => {
        if (!scrollerRef.current) return;
        scrollerRef.current.scrollTo({
          top: scrollerRef.current.scrollHeight,
          behavior: "instant",
        });
      }, 200);
    },
    [scrollerRef?.current]
  );

  const focusOnFlagHandler = useCallback(
    async (message: ChatItemType) => {
      if (!!message.deleted_at) return;
      if (message.reply_to === null) return;
      if (!scrollerRef.current || !finalMsg || messages === undefined) return;
      const sharedClsses = [
        "[&_.message-box]:!bg-blue-500/20",
        "[&_.message-box]:animate-pulse",
      ];
      //find index of messages that we want to focus
      let msgIndex = finalMsg.findIndex((m) => m.id === message.reply_to?.id);
      changeBulk({
        flag: "reply",
        originMessage: message,
      });
      //find scroller parent box
      let virEl = document.querySelector(
        `[data-testid="virtuoso-scroller"] [data-testid="virtuoso-item-list"]`
      ) as HTMLDivElement;
      const { focusHandler } = getFocusedMessage({
        message: virEl,
        changingClass: sharedClsses,
        targetIndex: msgIndex,
      });
      if (msgIndex >= 0) {
        virtousoRef.current?.scrollToIndex({
          index: msgIndex,
          behavior: "auto",
          align: "center",
        });
        focusHandler();
      } else {
        try {
          let finded = false;
          let ul = upperLimit;
          let dl = downLimit;
          let finalItems: ChatItemType[] = [...messages].reverse();
          changeKey({
            key: "navigateLoading",
            value: true,
          });
          while (!finded) {
            const { items } = await onLoadMessage(
              FetchMessageType.Next,
              ul,
              dl
            );
            ul++;
            dl++;
            virtousoRef.current?.scrollToIndex({
              index: 30,
              behavior: "auto",
              align: "center",
            });
            let newItems = [
              ...finalItems.slice(__VARS.defaultPerPage),
              ...items,
            ].reverse();
            finalItems = [...newItems];
            const findedIndex = newItems.findIndex(
              (msg) => msg.id === message.reply_to?.id
            );
            if (items.length === 0) {
              finded = true;
              try {
                let xFinded = false;
                let xul = ul;
                let xdl = dl;
                const flatIndex = totalLength - __VARS.defaultPerPage;
                let finalItems: ChatItemType[] = [...newItems];
                changeKey({
                  key: "navigateLoading",
                  value: true,
                });
                while (!xFinded) {
                  const { items } = await onLoadMessage(
                    FetchMessageType.Prev,
                    xul,
                    xdl
                  );
                  xul--;
                  xdl--;
                  virtousoRef.current?.scrollToIndex({
                    index: 30,
                    behavior: "auto",
                    align: "center",
                  });
                  let newItems = [];
                  if (xul === __VARS.pagesLimitDiff) {
                    newItems = [...items].reverse();
                  } else {
                    newItems = [
                      ...items,
                      ...finalItems.slice(0, flatIndex),
                    ].reverse();
                  }
                  finalItems = [...newItems].reverse();
                  const findedIndex = newItems.findIndex(
                    (msg) => msg.id === message.id
                  );
                  if (findedIndex >= 0 || xul < __VARS.pagesLimitDiff) {
                    changeKey({ key: "navigateLoading", value: false });
                    xFinded = false;
                    virtousoRef.current?.scrollToIndex({
                      index: findedIndex,
                      behavior: "auto",
                      align: "center",
                    });
                    break;
                  } else {
                    await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust delay as needed
                  }
                }
              } catch (error) {}
            }
            if (findedIndex >= 0) {
              changeKey({ key: "navigateLoading", value: false });
              finded = true;
              const { focusHandler } = getFocusedMessage({
                message: virEl,
                changingClass: sharedClsses,
                targetIndex: findedIndex,
              });
              virtousoRef.current?.scrollToIndex({
                index: findedIndex,
                behavior: "auto",
                align: "center",
              });
              focusHandler();
              break;
            } else {
              await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust delay as needed
            }
          }
        } catch (error) {}
      }
    },
    [onLoadMessage, finalMsg, upperLimit]
  );

  const onScrollHandler = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const element = e.currentTarget;

      const x = e.currentTarget.offsetHeight;
      const y = Math.floor(
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop
      );
      const diff = y - x;

      const targetIndex = __VARS.defaultPerPage;
      const topIndex = targetIndex;
      const bottomIndex = totalLength - targetIndex;

      //check is scroll getting top of the chat box
      if (element.scrollTop <= 0) {
        if (nextFetchRef.current) {
          nextFetchRef.current = false;
          loadMoreMessages(FetchMessageType.Next, topIndex);
        }
      }

      if (wheelDirection === "up") {
        setShowGotoBottom((crt) => (!!crt ? crt : true));
      }
      if (wheelDirection === "down") {
        setShowGotoBottom(false);
      }

      if (wheelDirection === "down" && downLimit > 1) {
        if (prevFetchRef.current) {
          prevFetchRef.current = false;
          loadMoreMessages(FetchMessageType.Prev, bottomIndex);
          setShowGotoBottom(false);
        }
      }

      if (diff > 100) {
        if (wheelDirection === "up") return;
        setWheelDirections("up");
      }
      if (diff < 100) {
        if (wheelDirection === "down") return;
        setWheelDirections("down");
      }

      // if (diff <= 100) {
      //   e.cancelable
      //   e.isDefaultPrevented
      // }
    },
    [onLoadMessage, wheelDirection]
  );

  const loadingNode = (loading: boolean) => {
    if (!loading) return null;
    return <FullLoading className='py-3' />;
  };

  let content = (
    <Virtuoso
      className='[&_[data-testid=virtuoso-item-list]]:px-2 '
      style={{ scrollbarWidth: isFirst ? "none" : "initial" }}
      ref={virtousoRef}
      scrollerRef={(xRef) => {
        if (!!!xRef) return;
        scrollerRef.current = xRef as HTMLDivElement;
      }}
      initialTopMostItemIndex={startMessageIndex}
      data={finalMsg}
      rows={4}
      components={{
        Footer: () => loadingNode(prevLoading),
        Header: () => loadingNode(nextLoading),
      }}
      itemContent={(_, item) => (
        <RowItem
          item={item}
          observerId={observer_user_id}
          onFetchMessages={() => focusOnFlagHandler(item)}
        />
      )}
      onScroll={onScrollHandler}
    />
  );

  if (messages?.length === 0) content = <NotFound title='No messages found!' />;

  return (
    <div className={`${clss} ${className}`}>
      {(navigateLoading && (
        <div className='absolute top-0 bg-white/60 z-[6] m-auto flex h-full w-full'>
          <FullLoading className='justify-center' />
        </div>
      )) ||
        null}
      {backToFromNode}
      {content}
    </div>
  );
}

export default memo(NewChatBox);
