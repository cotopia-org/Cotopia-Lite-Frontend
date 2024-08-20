import { ChatItemType } from "@/types/chat"
import ChatItem from "./chat-item"
import { useEffect, useRef, useState } from "react"
import { useReachTop } from "@/hooks/use-reach-top"
import useBus from "use-bus"
import { _BUS } from "@/app/const/bus"

type Props = {
  items: ChatItemType[]
  observer_user_id?: number
  onLoadMessage?: () => void
  fetchNewMessage?: boolean
  isFetching?: boolean
}
export default function ChatBox({
  items = [],
  observer_user_id,
  onLoadMessage,
  fetchNewMessage,
  isFetching,
}: Props) {
  const [isGetNewMessages, setIsGetNewMessages] = useState(false)

  const boxRef = useRef<HTMLDivElement>()

  const [boxHasScroll, setBoxHasScroll] = useState(false)
  const [boxScrollHeight, setBoxScrollHeight] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"top" | "down">("top")

  useEffect(() => {
    if (!boxRef.current) return

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setScrollDirection("top")
      } else {
        setScrollDirection("down")
      }
    }

    boxRef.current.addEventListener("wheel", handleWheel)

    return () => {
      boxRef.current?.removeEventListener("wheel", handleWheel)
    }
  }, [boxRef?.current])

  useEffect(() => {
    if (!boxRef?.current) return
    if (!isGetNewMessages) return
  }, [items?.length, boxRef?.current])

  useBus(
    _BUS.scrollEndChatBox,
    () => {
      if (!boxRef.current) return

      const scrollHeight = boxRef.current.scrollHeight
      const boxHeight = boxRef.current.clientHeight

      setBoxHasScroll(scrollHeight > boxHeight)

      boxRef.current.scrollTo({
        top: scrollHeight,
      })
    },
    [boxRef.current]
  )

  useBus(
    _BUS.scrollToTopNewChatMessages,
    () => {
      setTimeout(() => {
        if (!boxRef.current) return
        const previousScrollHeight = boxScrollHeight
        const newScrollHeight = boxRef?.current?.scrollHeight
        boxRef.current.scrollTo({
          top: newScrollHeight - previousScrollHeight,
          behavior: "instant",
        })
      }, 100)
    },
    [boxRef.current, boxScrollHeight]
  )
  useBus(
    _BUS.scrollToTargetMessage,
    (data: any) => {
      const messageId = data?.payload

      const messageEl: HTMLDivElement | null = document.querySelector(
        `.chat-item[data-id="${messageId}"]`
      )

      if (!messageEl || !messageEl) return

      messageEl?.classList?.add("[&_.message-box]:!bg-blue-500/20")
      messageEl?.classList?.add("[&_.message-box]:animate-pulse")

      boxRef.current?.scrollTo({
        top: messageEl.offsetTop - 200,
        behavior: "smooth",
      })

      setTimeout(() => {
        messageEl?.classList?.remove("[&_.message-box]:!bg-blue-500/20")
        messageEl?.classList?.remove("[&_.message-box]:animate-pulse")
      }, 1500)
    },
    [boxRef.current]
  )

  let clss =
    "relative flex flex-col gap-y-4 h-full max-h-full overflow-y-auto pb-8 px-2"

  const { reachTop: isReachTop } = useReachTop(boxRef?.current)
  const { reachTop: isReachTopToFetchChats, diff } = useReachTop(
    boxRef?.current
  )

  const loadMoreMessages = () => {
    if (!boxRef.current) return
    if (scrollDirection === "down") return

    if (onLoadMessage) {
      setBoxScrollHeight(boxRef?.current.scrollHeight)
      onLoadMessage()
      setIsGetNewMessages(true)
    }
  }

  useEffect(() => {
    if (fetchNewMessage === false) {
      return
    }

    if (diff < 200) {
      loadMoreMessages()
    }
  }, [diff, fetchNewMessage])

  if (items.length === 0) return

  return (
    <>
      {!!boxHasScroll && !isReachTop && (
        <div className="absolute top-[32px] left-0 h-[32px] z-10 bg-gradient-to-b from-white to-transparent w-full flex"></div>
      )}
      <div
        className={clss}
        ref={(xref) => {
          if (xref === null) return

          boxRef.current = xref
        }}
      >
        <div className="flex flex-col-reverse w-full gap-y-4" dir="auto">
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
  )
}
