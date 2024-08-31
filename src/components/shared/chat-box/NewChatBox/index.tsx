import { ChatItemType } from "@/types/chat"
import {
  UIEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { _BUS } from "@/app/const/bus"
import useBus from "use-bus"
import {
  FetchMessageType,
  UPPER_LIMIT_PAGE,
  useChatRoomCtx,
} from "@/context/chat-room-context"
import { ChevronDown } from "lucide-react"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { toast } from "sonner"
import { __VARS } from "@/app/const/vars"
import { useAppDispatch, useAppSelector } from "@/store/redux/store"
import { getMiddleIndex } from "@/lib/utils"
import ChatItem from "../chat-item"
import NotFound from "../../layouts/not-found"
import FullLoading from "../../full-loading"
import RowItem from "./RowItem"
import { getInitMessages } from "@/store/redux/slices/room-slice"
import { useRoomContext } from "../../room/room-context"

type Props = {
  observer_user_id?: number
  className?: string
}

export const SCROLL_THRESHOLD = 200

function NewChatBox({ observer_user_id, className = "" }: Props) {
  let clss = ""
  const {
    messages,
    loadMoreMessages: onLoadMessage,
    originMessage,
    upperLimit,
    downLimit,
    flag,

    changeBulk,
    changeKey,
  } = useChatRoomCtx()

  const { room_id } = useRoomContext()

  const prevFetchRef = useRef<boolean>(true)
  const nextFetchRef = useRef<boolean>(true)
  const totalLength = __VARS.defaultPerPage * __VARS.pagesLimitDiff

  const appDispatch = useAppDispatch()
  const [showGotoBottom, setShowGotoBottom] = useState(false)

  const { nextLoading, prevLoading } = useAppSelector(
    (state) => state.roomSlice
  )

  const isFirstView = upperLimit === __VARS.pagesLimitDiff

  let finalMsg = [...(messages as ChatItemType[])].reverse()

  const startMessageIndex = isFirstView
    ? finalMsg.length - 1
    : getMiddleIndex(totalLength)

  const virtousoRef = useRef<VirtuosoHandle>(null)
  const scrollerRef = useRef<HTMLDivElement>()

  const [isFirst, setIsFirst] = useState(true)

  const backToBottom = (type: "smooth" | "instant" = "smooth") => {
    if (scrollerRef?.current)
      virtousoRef.current?.scrollTo({
        top:
          scrollerRef.current?.scrollHeight + scrollerRef.current?.clientHeight,
        behavior: type,
      })
  }

  const backToMessageHandler = useCallback(async () => {
    if (!!originMessage && flag === "reply") {
      const findedIndex = finalMsg.findIndex(
        (msg) => msg.id === originMessage.id
      )
      if (findedIndex >= 0) {
        virtousoRef.current?.scrollToIndex({
          index: findedIndex,
          align: "end",
          behavior: "smooth",
        })
        changeBulk({ flag: undefined, originMessage: undefined })
      } else {
        toast.error("Origin message not found")
      }
    } else if (downLimit > 1) {
      if (room_id === undefined) return
      await appDispatch(
        getInitMessages({
          has_loading: false,
          room_id: room_id,
          upper_limit: UPPER_LIMIT_PAGE,
        })
      )
      backToBottom("instant")
    } else {
      backToBottom()
    }
    setShowGotoBottom(false)
  }, [finalMsg, originMessage, downLimit, room_id, showGotoBottom])

  let backToFromNode = null

  if (showGotoBottom) {
    backToFromNode = (
      <CotopiaIconButton
        onClick={backToMessageHandler}
        className="absolute bottom-20 z-[2] w-8 h-8 shadow-md opacity-50 hover:!opacity-100 !bg-primary right-5 animate-bounce"
      >
        <ChevronDown />
      </CotopiaIconButton>
    )
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsFirst(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!nextFetchRef.current) {
      nextFetchRef.current = true
    }
  }, [upperLimit])

  useEffect(() => {
    if (!prevFetchRef.current) {
      prevFetchRef.current = true
    }
  }, [downLimit])

  const loadMoreMessages = useCallback(
    async (type: FetchMessageType, targetIdx: number) => {
      if (!scrollerRef.current) return
      await onLoadMessage(type)
      setTimeout(() => {
        virtousoRef?.current?.scrollToIndex({
          index: targetIdx,
          align: "center",
        })
      }, 100)
    },
    [onLoadMessage]
  )

  useBus(
    _BUS.scrollEndChatBox,
    (data) => {
      setTimeout(() => {
        if (!scrollerRef.current) return
        scrollerRef.current.scrollTo({
          top: scrollerRef.current.scrollHeight,
          behavior: "instant",
        })
      }, 200)
    },
    [scrollerRef?.current]
  )

  const focusOnFlagHandler = useCallback(
    async (message: ChatItemType) => {
      if (!scrollerRef.current) return
      try {
        let finded = false
        let currPage = 1
        let finalItems = [...(messages as ChatItemType[])]
        changeBulk({ flag: "reply", originMessage: message })
        while (!finded) {
          const items = await onLoadMessage(currPage)
          currPage++
          finalItems = [...finalItems, ...(items as any)]
            .reverse()
            .sort((a, b) => a.id - b.id)
          const msggs = [...finalItems]
          const findedIndex = msggs.findIndex(
            (msg) => msg.id === message.reply_to.id
          )

          changeKey({ key: "messages", value: msggs.reverse() })

          if (findedIndex >= 0) {
            let mmm = document.querySelector(
              `[data-testid="virtuoso-scroller"] [data-testid="virtuoso-item-list"] `
            ) as any

            finded = true
            virtousoRef.current?.scrollToIndex({
              index: findedIndex,
              behavior: "auto",
              align: "center",
            })

            setTimeout(() => {
              for (let item of mmm.childNodes) {
                if (+(item as any)?.dataset.index == findedIndex) {
                  item?.classList?.add("[&_.message-box]:!bg-blue-500/20")
                  item?.classList?.add("[&_.message-box]:animate-pulse")
                  setTimeout(() => {
                    item?.classList?.remove("[&_.message-box]:!bg-blue-500/20")
                    item?.classList?.remove("[&_.message-box]:animate-pulse")
                  }, 1500)
                }
              }
            }, 500)

            break
          } else {
            await new Promise((resolve) => setTimeout(resolve, 10)) // Adjust delay as needed
          }
        }
      } catch (error) {}
    },
    [onLoadMessage, messages]
  )

  const onScrollHandler = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      //scroll limit for getting to fetching messages in end or start of chat

      const element = e.currentTarget
      //the message index should be target after fetching
      const targeIndex = __VARS.defaultPerPage
      const topIndex = targeIndex
      const bottomIndex = totalLength - targeIndex

      const elementRect = element.getBoundingClientRect()
      //check is scroll getting top of the chat box
      if (element.scrollTop <= 0) {
        if (nextFetchRef.current) {
          nextFetchRef.current = false
          loadMoreMessages(FetchMessageType.Next, topIndex)
        }
      }
      //clac prev message treshold to fetch
      const bottomFetchingTreshold =
        element.scrollHeight -
        Math.floor(elementRect.bottom + element.scrollTop)

      if (bottomFetchingTreshold > 0) {
        setShowGotoBottom((crt) => (!!crt ? crt : true))
      }
      if (bottomFetchingTreshold <= 0) {
        setShowGotoBottom(false)
      }

      if (bottomFetchingTreshold <= 0 && downLimit > 1) {
        if (prevFetchRef.current) {
          prevFetchRef.current = false
          loadMoreMessages(FetchMessageType.Prev, bottomIndex)
          setShowGotoBottom(false)
        }
      }
    },
    [onLoadMessage]
  )

  const loadingNode = (loading: boolean) => {
    if (!loading) return null
    return <FullLoading className="py-3" />
  }

  let content = (
    <Virtuoso
      className="[&_[data-testid=virtuoso-item-list]]:px-2 "
      style={{ scrollbarWidth: isFirst ? "none" : "initial" }}
      ref={virtousoRef}
      scrollerRef={(xRef) => {
        if (!!!xRef) return
        scrollerRef.current = xRef as HTMLDivElement
      }}
      initialTopMostItemIndex={startMessageIndex}
      data={finalMsg}
      components={{
        Footer: () => loadingNode(prevLoading),
        Header: () => loadingNode(nextLoading),
      }}
      itemContent={(_, item) => (
        <RowItem
          item={item}
          observerId={observer_user_id}
          // onFetchMessages={() => {}}
        />
      )}
      onScroll={onScrollHandler}
    />
  )

  if (messages?.length === 0) content = <NotFound title="No messages found!" />

  return (
    <div className={`${clss} ${className}`}>
      {backToFromNode}
      {content}
    </div>
  )
}

export default memo(NewChatBox)