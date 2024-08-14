import ChatBox from "@/components/shared/chat-box"
import ChatUserInput from "@/components/shared/chat-box/user-input"
import { useChat } from "@/hooks/chat/use-chat"
import { ChatItemType } from "@/types/chat"
import { useCallback, useEffect, useState } from "react"
import { useRoomContext } from "../../../room-context"
import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper"
import { MessageType } from "@/types/message"
import axiosInstance from "@/lib/axios"
import FullLoading from "@/components/shared/full-loading"
import useLoading from "@/hooks/use-loading"
import { dispatch } from "use-bus"
import { _BUS } from "@/app/const/bus"

export default function UserChatRoom() {
  const { user } = useProfile()
  const { room_id } = useRoomContext()

  const { startLoading, stopLoading, isLoading } = useLoading()
  const [messages, setMessages] = useState<ChatItemType[]>([])
  const [hasFetchNewMessage, setHasFetchNewMessage] = useState(true)

  const [page, setPage] = useState(1)

  const {
    startLoading: startFetchOldMessagesLoading,
    stopLoading: stopOldMessagesLoading,
    isLoading: fetchOldMessagesLoading,
  } = useLoading()

  const getMessages = (firstTime: boolean = false) => {
    if (fetchOldMessagesLoading) return

    if (firstTime) {
      startLoading()
    }

    startFetchOldMessagesLoading()

    axiosInstance
      .get(`/rooms/${room_id}/messages?page=${page}`)
      .then((res) => {
        const data = res.data
        const items: MessageType[] = !!data ? data?.data : []
        if (items.length === 0) {
          setHasFetchNewMessage(false)
        }
        setMessages((prev) => (firstTime ? items : [...prev, ...items]))
        //Page should be set for next page whenever fetch new data
        setPage((prev) => prev + 1)
        if (firstTime) {
          stopLoading()
          dispatch(_BUS.scrollEndChatBox)
        } else {
          dispatch(_BUS.scrollToTopNewChatMessages)
        }
        stopOldMessagesLoading()
      })
      .catch((err) => {
        if (firstTime) stopLoading()
        stopOldMessagesLoading()
      })
  }

  useEffect(() => {
    getMessages(true)
  }, [])

  const { sendToRoom } = useChat()

  const handleUpdateMessages = (chat: ChatItemType) => {
    const chatIds = messages.map((x) => x.id)
    const foundIndex = chatIds.indexOf(chat.id)

    let newMessages = [...messages]

    if (foundIndex > -1) {
      newMessages[foundIndex] = chat
    } else {
      newMessages = [chat, ...messages]
    }

    setMessages(newMessages)
  }

  const handleAddMessage = useCallback(
    async (text: string) => {
      if (!room_id) return
      try {
        const message = await sendToRoom(text, room_id)
        if (message) handleUpdateMessages(message)
        dispatch(_BUS.scrollEndChatBox)
      } catch (e) {}
    },
    [room_id, handleUpdateMessages]
  )

  useSocket(
    "roomMessages",
    (data: MessageType) => {
      handleUpdateMessages(data)
    },
    [handleAddMessage]
  )

  let content = (
    <>
      <ChatBox
        items={messages}
        observer_user_id={user?.id}
        onLoadMessage={getMessages}
        fetchNewMessage={hasFetchNewMessage}
        isFetching={fetchOldMessagesLoading}
      />
      <ChatUserInput onAdd={handleAddMessage} />
    </>
  )

  if (isLoading) content = <FullLoading />

  return (
    <div className="relative h-full flex flex-col justify-between  pt-8">
      {content}
    </div>
  )
}
