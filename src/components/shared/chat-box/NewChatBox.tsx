import { ChatItemType } from "@/types/chat"
import ChatItem from "./chat-item"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { _BUS } from "@/app/const/bus"
import NotFound from "../layouts/not-found"
import useBus from "use-bus"
import { useChatRoomCtx } from "@/context/chat-room-context"
import { ChevronDown } from "lucide-react"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { toast } from "sonner"

type Props = {
  observer_user_id?: number
  className?: string
}

const RowItem = ({
  item,
  observerId,
  onFetchMessages,
}: {
  item: ChatItemType
  observerId?: number
  onFetchMessages: () => Promise<void>
}) => {
  const chatRef = useRef<HTMLDialogElement>()

  return (
    <ChatItem
      onFlagSelect={onFetchMessages}
      ref={chatRef}
      item={item}
      observer_user_id={observerId}
    />
  )
}
function NewChatBox({ observer_user_id, className = "" }: Props) {
  let clss = "max-h-full"

  const {
    messages,
    loadMoreMessages: onLoadMessage,
    messagesPage: page,
    originMessage,
    flag,
    changeBulk,
    changeKey,
  } = useChatRoomCtx()
  let finalMsg = [...(messages as ChatItemType[])].reverse()

  const backToMessageHandler = useCallback(() => {
    if (originMessage === undefined) return
    const findedIndex = finalMsg.findIndex((msg) => msg.id === originMessage.id)

    if (findedIndex >= 0) {
      virtousoRef.current?.scrollToIndex({
        index: findedIndex,
        align: "start",
        behavior: "auto",
      })
      changeBulk({ flag: undefined, originMessage: undefined })
    } else {
      toast.error("Origin message not found")
    }
  }, [finalMsg, originMessage])

  let backToFromNode = null

  if (!!originMessage && flag === "reply") {
    backToFromNode = (
      <CotopiaIconButton
        onClick={backToMessageHandler}
        className="absolute bottom-20 z-[2] w-8 h-8 shadow-md !bg-primary right-5 animate-bounce"
      >
        <ChevronDown />
      </CotopiaIconButton>
    )
  }

  const virtousoRef = useRef<VirtuosoHandle>(null)
  const scrollerRef = useRef<HTMLDivElement>()

  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsFirst(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  const loadMoreMessages = useCallback(async () => {
    if (!scrollerRef.current) return
    await onLoadMessage()
    setTimeout(() => {
      virtousoRef?.current?.scrollToIndex({
        index: 9,
        align: "center",
      })
    }, 100)
  }, [onLoadMessage])

  useBus(
    _BUS.scrollEndChatBox,
    (data) => {
      if (!scrollerRef.current) return

      virtousoRef.current?.scrollToIndex({
        index: (messages as ChatItemType[])?.length - 1,
      })
    },
    [scrollerRef?.current, messages]
  )

  const focusOnFlagHandler = useCallback(
    async (message: ChatItemType) => {
      if (!scrollerRef.current) return
      try {
        let finded = false
        let currPage = page
        let finalItems = [...(messages as ChatItemType[])]
        changeBulk({ flag: "reply", originMessage: message })
        while (!finded) {
          const items = await onLoadMessage(currPage)
          currPage++
          finalItems = [...finalItems, ...(items as ChatItemType[])]
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
    [onLoadMessage, messages, page]
  )

  let content = (
    <Virtuoso
      className="[&_[data-testid=virtuoso-item-list]]:px-2 "
      style={{ scrollbarWidth: isFirst ? "none" : "initial" }}
      ref={virtousoRef}
      scrollerRef={(xRef) => {
        if (!!!xRef) return
        scrollerRef.current = xRef as HTMLDivElement
      }}
      initialTopMostItemIndex={finalMsg.length - 1}
      data={finalMsg}
      totalCount={finalMsg.length}
      itemContent={(_, item) => (
        <RowItem
          item={item}
          observerId={observer_user_id}
          onFetchMessages={() => focusOnFlagHandler(item)}
        />
      )}
      onScroll={(e) => {
        if (e.currentTarget.scrollTop <= 0) {
          loadMoreMessages()
        } else {
          return
        }
      }}
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
