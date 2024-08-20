import { useChat } from "@/hooks/chat/use-chat"
import { ChatItemType } from "@/types/chat"
import { useEffect, useRef, useState } from "react"
import Linkify from "react-linkify"

type Props = {
  item: ChatItemType
}
export default function Message({ item }: Props) {
  const [stateMessage, setStateMessage] = useState(item)

  useEffect(() => {
    if (item !== undefined) setStateMessage(item)
  }, [item])

  const divRef = useRef<HTMLDivElement>(null)

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

  const { seenMessage } = useChat()

  useEffect(() => {
    if (isVisible && stateMessage?.seen === false) {
      seenMessage(stateMessage?.id).then((res) => {
        setStateMessage({
          ...stateMessage,
          seen: true,
        })
      })
    }
  }, [stateMessage, isVisible])

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
