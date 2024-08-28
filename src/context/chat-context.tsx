import { ChatItemType } from "@/types/chat"
import { ReactNode, createContext, useContext, useReducer } from "react"

type MessageType = "reply" | "edit" | undefined

type ChatContextType = {
  message: ChatItemType | null
  replyed: boolean
  type: MessageType
  changeKey: (value: { key: string; value: any }) => void
  changeBulk: (values: { [key: string]: any }) => void
}

const initContext: ChatContextType = {
  type: undefined,
  message: null,
  replyed: false,
  changeKey: (value) => {},
  changeBulk(values) {},
}

const ChatContext = createContext(initContext)

type InitStateType = {
  type: MessageType
  message: ChatItemType | null
  replyed: boolean
}

const initState: InitStateType = {
  type: undefined,
  message: null,
  replyed: false,
}

type ActionType =
  | {
      type: "CHANGE_KEY"
      payload: { key: string; value: any }
    }
  | {
      type: "CHANGE_BULK"
      payload: { [key: string]: string }
    }

const reducer = (state: InitStateType, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_KEY":
      return { ...state, [action.payload.key]: action.payload.value }
    case "CHANGE_BULK":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const changeStateHandler = (value: { key: string; value: any }) => {
    dispatch({ type: "CHANGE_KEY", payload: value })
  }

  const changeBultHandler = (values: { [key: string]: any }) => {
    dispatch({ type: "CHANGE_BULK", payload: values })
  }

  return (
    <ChatContext.Provider
      value={{
        message: state.message,
        replyed: state.replyed,
        type: state.type,
        changeKey: changeStateHandler,
        changeBulk: changeBultHandler,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatCtx = () => useContext(ChatContext)

export default ChatContextProvider
