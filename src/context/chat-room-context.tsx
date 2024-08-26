import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import { useRoomContext } from "@/components/shared/room/room-context"
import { useChat } from "@/hooks/chat/use-chat"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { urlWithQueryParams } from "@/lib/utils"
import { ChatItemType } from "@/types/chat"
import { MessageType } from "@/types/message"
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react"

import { dispatch as busDispatch } from "use-bus"

export type FlagType = "edit" | "reply" | "pin"

type InitCtxType = {
  messages: ChatItemType[] | undefined
  targetMessage: ChatItemType | undefined
  originMessage: ChatItemType | undefined
  flag: FlagType | undefined
  messagesPage: number
  moveToFlag: boolean
  backFromFlag: boolean
  loading: boolean
  loadMoreMessages: (page?: number) => Promise<ChatItemType[] | undefined>
  onAddMessage: (text: string) => void
  onReplyMessage: (text: string) => void
  onEditMessage: (text: string) => void
  changeKey: (value: { key: string; value: any }) => void
  changeBulk: (values: { [key: string]: any }) => void
}

const initCtx: InitCtxType = {
  messages: [],
  targetMessage: undefined,
  originMessage: undefined,
  loading: false,
  flag: undefined,
  moveToFlag: false,
  backFromFlag: false,
  messagesPage: 1,
  onAddMessage: () => {},
  onEditMessage: () => {},
  onReplyMessage: () => {},
  changeKey: (value) => {},
  changeBulk(values) {},
  loadMoreMessages: (page?: number) => new Promise((resolve, reject) => {}),
}

const ChatRoomCtx = createContext(initCtx)

export enum RoomSoocketType {
  "room" = "roomMessages",
  "direct" = "directMessages",
}

type InitStateType = {
  messages: ChatItemType[] | undefined
  moveToFlag: boolean
  backFromFlag: boolean
  page: number
  targetMessage: ChatItemType | undefined
  originMessage: ChatItemType | undefined
  flag: FlagType | undefined
}

const initialState: InitStateType = {
  messages: undefined,
  page: 1,
  moveToFlag: false,
  backFromFlag: false,
  targetMessage: undefined,
  originMessage: undefined,
  flag: undefined,
}

type ActionTypes =
  | {
      type: "CHANGE_KEY"
      payload: { key: string; value: any }
    }
  | {
      type: "CHANGE_BULK"
      payload: { [key: string]: any }
    }

const reducer = (state: InitStateType, action: ActionTypes) => {
  switch (action.type) {
    case "CHANGE_KEY":
      const targetKey = action.payload.key
      const targetVal = action.payload.value
      return { ...state, [targetKey]: targetVal }
    case "CHANGE_BULK":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const ChatRoomCtxProvider = ({
  children,
  endpoint,
  type,
}: {
  children: ReactNode
  endpoint: string
  type: RoomSoocketType
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading()

  const [state, dispatch] = useReducer(reducer, initialState)

  const { room_id } = useRoomContext()
  const { sendToRoom, editMessage } = useChat()

  const getMessages = async (defaultPage: number = state.page) => {
    try {
      const res = await axiosInstance.get(
        urlWithQueryParams(endpoint, { page: defaultPage })
      )
      const data = res?.data
      const items: ChatItemType[] = !!data ? data?.data : []
      dispatch({
        type: "CHANGE_KEY",
        payload: { key: "page", value: state.page + 1 },
      })
      return items
    } catch (error) {}
  }

  useEffect(() => {
    const firstFetchMessages = async () => {
      startLoading()
      const items = await getMessages()
      dispatch({
        type: "CHANGE_KEY",
        payload: { key: "messages", value: items },
      })
      stopLoading()
    }

    firstFetchMessages()
  }, [])

  const loadMoreMessages = async (page?: number) => {
    try {
      const items = await getMessages(page)
      const prevMessages = state.messages as ChatItemType[]
      const newMessages = [...prevMessages, ...(items as ChatItemType[])]
      dispatch({
        type: "CHANGE_KEY",
        payload: { key: "messages", value: newMessages },
      })
      return items
    } catch (error) {}
  }

  const updateMessagesHandler = useCallback(
    (chat: ChatItemType) => {
      const lastMsgs = [...(state.messages ?? [])]

      const chatIds = lastMsgs.map((x) => x.id)
      const foundIndex = chatIds.indexOf(chat.id)

      let newMessages = [...lastMsgs]

      if (foundIndex > -1) {
        newMessages[foundIndex] = chat
      } else {
        newMessages = [chat, ...lastMsgs]
      }
      dispatch({
        type: "CHANGE_KEY",
        payload: { key: "messages", value: newMessages },
      })
    },
    [state.messages]
  )

  const addMessageHandler = useCallback(
    async (text: string) => {
      if (!room_id) return
      try {
        const message = await sendToRoom(text, room_id)
        if (message) updateMessagesHandler(message)
        busDispatch(_BUS.scrollEndChatBox)
      } catch (e) {}
    },
    [room_id, updateMessagesHandler, busDispatch]
  )

  const editMessageHandler = useCallback(
    async (text: string) => {
      if (state.targetMessage === undefined) return
      dispatch({
        type: "CHANGE_BULK",
        payload: { targetMessage: undefined, flag: undefined },
      })
      try {
        const message = await editMessage(text, state.targetMessage?.id)
        if (message) updateMessagesHandler(message)
      } catch (error) {}
    },
    [state.targetMessage, updateMessagesHandler]
  )

  const replyMessageHandler = useCallback(
    async (text: string) => {
      if (!state.targetMessage || !room_id) return
      dispatch({
        type: "CHANGE_BULK",
        payload: { targetMessage: undefined, flag: undefined },
      })
      try {
        const message = await sendToRoom(text, room_id, state.targetMessage.id)
        if (message) updateMessagesHandler(message)
        busDispatch(_BUS.scrollEndChatBox)
      } catch (error) {}
    },
    [updateMessagesHandler, room_id, state.targetMessage, busDispatch]
  )

  const changeStateHandler = (value: { key: string; value: any }) => {
    dispatch({ type: "CHANGE_KEY", payload: value })
  }

  const changeBultHandler = (values: { [key: string]: any }) => {
    dispatch({ type: "CHANGE_BULK", payload: values })
  }

  useSocket(
    type,
    (data: MessageType) => {
      updateMessagesHandler(data)
    },
    [addMessageHandler]
  )

  const loading = state?.messages === undefined || isLoading

  return (
    <ChatRoomCtx.Provider
      value={{
        loading,
        flag: state.flag,
        moveToFlag: state.moveToFlag,
        backFromFlag: state.backFromFlag,
        messagesPage: state.page,
        originMessage: state.originMessage,
        changeKey: changeStateHandler,
        changeBulk: changeBultHandler,
        messages: state.messages,
        targetMessage: state.targetMessage,
        loadMoreMessages: loadMoreMessages,
        onAddMessage: addMessageHandler,
        onEditMessage: editMessageHandler,
        onReplyMessage: replyMessageHandler,
      }}
    >
      {children}
    </ChatRoomCtx.Provider>
  )
}

export const useChatRoomCtx = () => useContext(ChatRoomCtx)

export default ChatRoomCtxProvider
