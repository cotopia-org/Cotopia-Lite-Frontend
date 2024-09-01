import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { useChatRoomCtx } from "@/context/chat-room-context"
import { ChatItemType } from "@/types/chat"
import { useEffect, useRef, useState } from "react"
import Linkify from "react-linkify"

type Props = {
  isMine: boolean
  item: ChatItemType
}
export default function Message({ item, isMine }: Props) {
  const divRef = useRef<HTMLDivElement>(null)

  const { roomId } = useChatRoomCtx()

  const socket = useSocket()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    )

    if (divRef.current) {
      observer.observe(divRef.current)
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && item?.seen === false && !isMine) {
      if (socket) {
        socket.emit("seenMessage", { room_id: roomId, message: item })
      }
    }
  }, [item, isVisible, isMine, socket])

  return (
    <div
      className="text-wrap mb-3 w-full"
      dir="auto"
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
            target="_blank"
            className="text-blue-600 hover:underline whitespace-pre-wrap"
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
  )
}
