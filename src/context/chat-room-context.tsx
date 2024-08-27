import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { _BUS } from "@/app/const/bus"
import { __VARS } from "@/app/const/vars"
import { useRoomContext } from "@/components/shared/room/room-context"
import { useChat } from "@/hooks/chat/use-chat"

import {
  RoomDetailsType,
  getInitMessages,
  getNextMessages,
  getPrevMessages,
  updateMessages,
} from "@/store/redux/slices/room-slice"
import { useAppDispatch, useAppSelector } from "@/store/redux/store"
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

export enum FetchMessageType {
  "Prev" = 1,
  "Next" = 2,
}

type InitCtxType = {
  env: RoomEnvironmentType
  messages: ChatItemType[] | undefined
  targetMessage: ChatItemType | undefined
  originMessage: ChatItemType | undefined
  flag: FlagType | undefined
  moveToFlag: boolean
  backFromFlag: boolean
  loading: boolean
  upperLimit: number
  downLimit: number
  loadMoreMessages: (type: FetchMessageType, page?: number) => Promise<void>
  onAddMessage: (text: string) => void
  onReplyMessage: (text: string) => void
  onEditMessage: (text: string) => void
  changeKey: (value: { key: string; value: any }) => void
  changeBulk: (values: { [key: string]: any }) => void
}

export enum RoomEnvironmentType {
  "room" = "roomMessages",
  "direct" = "directMessages",
}
const initCtx: InitCtxType = {
  env: RoomEnvironmentType.room,
  messages: [],
  targetMessage: undefined,
  originMessage: undefined,
  loading: false,
  flag: undefined,
  moveToFlag: false,
  backFromFlag: false,
  onAddMessage: () => {},
  upperLimit: __VARS.pagesLimitDiff,
  downLimit: 1,
  onEditMessage: () => {},
  onReplyMessage: () => {},
  changeKey: (value) => {},
  changeBulk: (values) => {},
  loadMoreMessages: () => new Promise<void>((resolve, reject) => {}),
}

const ChatRoomCtx = createContext(initCtx)

type InitStateType = {
  moveToFlag: boolean
  backFromFlag: boolean
  page: number
  targetMessage: ChatItemType | undefined
  originMessage: ChatItemType | undefined
  flag: FlagType | undefined
}

const initialState: InitStateType = {
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

const UPPER_LIMIT_PAGE = __VARS.pagesLimitDiff
const DOWN_LIMIT_PAGE = 1

const ChatRoomCtxProvider = ({
  children,
  environment,
}: {
  children: ReactNode
  environment: RoomEnvironmentType
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const appDispatch = useAppDispatch()

  const { chatRoom, loading } = useAppSelector((state) => state.roomSlice)

  const { room_id } = useRoomContext()

  const { sendToRoom, editMessage } = useChat()

  if (!room_id) return null

  let selectedRoom: RoomDetailsType | undefined = undefined

  //collect all chat room ids
  const roomIds = chatRoom ? Object.keys(chatRoom) : []
  //check is room exist or not
  if (roomIds.includes(room_id)) {
    selectedRoom = chatRoom?.[room_id]
  }

  const upper_limit = selectedRoom?.upper_limit ?? UPPER_LIMIT_PAGE

  const down_limit = selectedRoom?.down_limit ?? DOWN_LIMIT_PAGE

  const isFirstFetch = selectedRoom === undefined

  const messages = selectedRoom?.messages ?? []

  useEffect(() => {
    const firstFetchMessages = async () => {
      if (!room_id || !isFirstFetch) return
      appDispatch(
        getInitMessages({
          room_id: room_id,
          upper_limit: UPPER_LIMIT_PAGE,
        })
      )
    }

    firstFetchMessages()
  }, [isFirstFetch])

  const loadMoreMessages = useCallback(
    async (type: FetchMessageType, page?: number) => {
      const objToSend = { room_id, upper_limit, down_limit }
      if (!!page) objToSend["upper_limit"] = page

      switch (type) {
        case FetchMessageType.Next:
          appDispatch(getNextMessages(objToSend))
          break
        case FetchMessageType.Prev:
          appDispatch(getPrevMessages(objToSend))
          break
      }
    },
    [upper_limit, down_limit]
  )

  const updateMessagesHandler = useCallback((chat: ChatItemType) => {
    appDispatch(updateMessages({ message: chat, roomId: room_id }))
  }, [])

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
    environment,
    (data: MessageType) => {
      updateMessagesHandler(data)
    },
    [addMessageHandler]
  )

  return (
    <ChatRoomCtx.Provider
      value={{
        env: environment,
        loading: loading || chatRoom === undefined,
        flag: state.flag,
        upperLimit: upper_limit,
        downLimit: down_limit,
        moveToFlag: state.moveToFlag,
        backFromFlag: state.backFromFlag,
        originMessage: state.originMessage,
        changeKey: changeStateHandler,
        changeBulk: changeBultHandler,
        messages,
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
