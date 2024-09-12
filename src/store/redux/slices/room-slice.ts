import { _BUS } from "@/app/const/bus"
import { __VARS } from "@/app/const/vars"
import { DOWN_LIMIT_PAGE } from "@/context/chat-room-context"
import { PartialBy } from "@/hooks/chat/use-chat-socket"
import axiosInstance from "@/lib/axios"
import { urlWithQueryParams } from "@/lib/utils"
import { ChatItemType } from "@/types/chat"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export type RoomDetailsType = {
  messages: ChatItemType[]
  resend_loading?: boolean

  upper_limit: number
  down_limit: number
}

export type ChatRoomSliceType = {
  [key: string | number]: RoomDetailsType
}

export type InitialStateType = {
  loading: boolean
  isRoomChecked: boolean
  isDirectChecked: boolean
  messages_count: {
    directs: { [key: number]: number[] }
    room: number[]
  }
  nextLoading: boolean
  prevLoading: boolean
  chatRoom: ChatRoomSliceType | undefined
}

const initialState: InitialStateType = {
  loading: false,
  nextLoading: false,
  isRoomChecked: false,
  isDirectChecked: false,
  prevLoading: false,
  chatRoom: undefined,
  messages_count: {
    directs: {},
    room: [],
  },
}

export const getInitMessages = createAsyncThunk(
  "room/getInitMessages",
  async ({
    room_id,
    upper_limit,
    has_loading = false,
  }: {
    room_id: number
    has_loading: boolean
    upper_limit: number
  }) => {
    //calculate per page base on upper limit
    let perPage = (__VARS.defaultPerPage / 2) * upper_limit

    const res = await axiosInstance.get(
      urlWithQueryParams(`/rooms/${room_id}/messages`, {
        page: 1,
        perPage,
      })
    )
    const data = res?.data
    const messages: ChatItemType[] = (!!data && data?.data) || []

    return { messages, upper_limit, room_id, has_loading }
  }
)

export const getNextMessages = createAsyncThunk(
  "room/getNextMessages",
  async ({
    room_id,
    upper_limit,
    down_limit,
  }: {
    room_id: number
    upper_limit: number
    down_limit: number
  }) => {
    try {
      const res = await axiosInstance.get(
        urlWithQueryParams(`/rooms/${room_id}/messages`, {
          page: upper_limit + 1,
          perPage: __VARS.defaultPerPage,
        })
      )
      const data = res?.data
      const items: ChatItemType[] = (!!data && data.data) || []

      return {
        messages: items,
        upperLimit: upper_limit,
        downLimit: down_limit,
        roomId: room_id,
      }
    } catch (error) {}

    //GETTING NEXT MESSAGE SHOULD BE HANDLED HERE
  }
)

export const getPrevMessages = createAsyncThunk(
  "room/getPrevMessages",
  async ({
    room_id,
    upper_limit,
    down_limit,
  }: {
    room_id: number
    upper_limit: number
    down_limit: number
  }) => {
    const newUpperLimit = upper_limit - 1
    const newDownLimit = down_limit - 1
    let perPage = __VARS.defaultPerPage
    let page = newUpperLimit
    const isFirstPage = newUpperLimit === __VARS.pagesLimitDiff
    if (isFirstPage) {
      perPage = (__VARS.defaultPerPage / 2) * __VARS.pagesLimitDiff
      page = DOWN_LIMIT_PAGE
    }

    if (newDownLimit === 0) {
      return {
        messages: [],
        upperLimit: upper_limit,
        downLimit: down_limit,
      }
    }

    try {
      const res = await axiosInstance.get(
        urlWithQueryParams(`/rooms/${room_id}/messages`, {
          page: page,
          perPage: perPage,
        })
      )
      const data = res?.data

      const items: ChatItemType = (!!data && data.data) || []

      return {
        messages: items,
        upperLimit: newUpperLimit,
        isFirstPage: isFirstPage,
        downLimit: newDownLimit,
        roomId: room_id,
      }
    } catch (error) {}
    //GETTING NEXT MESSAGE SHOULD BE HANDLED HERE
  }
)

const roomSlice = createSlice({
  name: "room-slice",
  initialState: initialState,
  reducers: {
    unreadMessages: (
      state,
      action: PayloadAction<{
        message: ChatItemType
        messageType: "direct" | "room" | "seen"
      }>
    ) => {
      const message = action.payload.message

      if (message.nonce_id === null) return

      const roomId = message.room_id

      const messageId = message.nonce_id

      const messageType = action.payload?.messageType ?? undefined

      //get all room or direct messages collected ids
      let unreadsCollection = state.messages_count

      let directMsgs: { [key: number]: number[] } = unreadsCollection.directs

      let roomIds: number[] = unreadsCollection.room

      let directChecked = state.isDirectChecked
      let RoomChecked = state.isRoomChecked

      let newDirects = { ...directMsgs }
      let newRoomIds = [...roomIds]

      switch (messageType) {
        case "direct":
          //get all msg ids that are in desired room
          let directMsgIds = directMsgs?.[roomId]
          //collect all existing direct message ids
          if (!message.seen) {
            if (directMsgIds?.length > 0) {
              newDirects = {
                ...newDirects,
                [roomId]: [...newDirects[roomId], messageId],
              }
            } else {
              newDirects = { ...newDirects, [roomId]: [messageId] }
            }
          }
          break
        case "room":
          if (!message.seen) {
            newRoomIds = [...newRoomIds, messageId]
          }
          break
        case "seen":
          let currentDmIds = directMsgs?.[roomId]
          //check the seen message is related to directs or not
          const isDirectExist = currentDmIds !== undefined
          //check the seen message is related to room messages or not
          const isRoomExist = roomIds.includes(messageId)
          if (isDirectExist) {
            directChecked = true
            let filteredDirect = newDirects[roomId].filter((x) => {
              return +x !== +messageId
            })
            newDirects = {
              ...newDirects,
              [roomId]: filteredDirect,
            }
          }
          if (isRoomExist) {
            RoomChecked = true
            newRoomIds = newRoomIds.filter((y) => +y !== messageId)
          }
          break
        default:
          break
      }

      return {
        ...state,
        isRoomChecked: RoomChecked,
        isDirectChecked: directChecked,
        messages_count: {
          room: newRoomIds,
          directs: Object.entries(newDirects)
            .filter(([_, value]) => value.length > 0)
            .reduce((acc, [key, value]) => ({ ...acc, [+key]: value }), {}),
        },
      }
    },
    updateMessages: (
      state,
      action: PayloadAction<{
        message: ChatItemType
      }>
    ) => {
      if (state?.chatRoom === undefined) return

      const message = action.payload.message
      const roomId = message.room_id
      const prevMessages = state.chatRoom?.[roomId]?.messages ?? []
      const chatIds = prevMessages.map((x: any) => +x.nonce_id)

      //For legacy messages - TODO should remove from here
      if (message.nonce_id === 0) return

      const foundIndex = message.nonce_id
        ? chatIds.indexOf(+message.nonce_id)
        : -1

      let newMessages = [...prevMessages]

      if (foundIndex > -1) {
        newMessages[foundIndex] = message
      } else {
        newMessages = [message, ...prevMessages]
        //Badge on nav button should be handle here
      }
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [roomId]: {
            ...(state?.chatRoom?.[roomId] ?? {}),
            messages: newMessages,
          },
        },
      }
    },
    sendMessage: (state, action: PayloadAction<{ message: ChatItemType }>) => {
      const message = action.payload.message
      const roomId = message.room_id
      if (!state.chatRoom || roomId === undefined) return

      const prevMessages = state.chatRoom[roomId].messages ?? []
      const msgIndex = prevMessages.findIndex(
        (msg) => msg.nonce_id === message.nonce_id
      )

      let newMessages = [...prevMessages]
      if (msgIndex >= 0) {
        newMessages[msgIndex] = message
      } else {
        newMessages = [message, ...newMessages]
      }
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [roomId]: {
            ...state.chatRoom[roomId],
            messages: newMessages,
          },
        },
      }
    },
    changeRoomItemByKey: (
      state,
      action: PayloadAction<{
        roomId: number
        key: keyof RoomDetailsType
        value: any
      }>
    ) => {
      const { payload } = action
      if (!state?.chatRoom || !state?.chatRoom?.[payload.roomId]) return
      let targetRoom = state.chatRoom[payload.roomId]
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [payload.roomId]: {
            ...targetRoom,
            [payload.key]: payload.value,
          },
        },
      }
    },
    removeMessage: (
      state,
      action: PayloadAction<{ message: ChatItemType }>
    ) => {
      const message = action.payload.message
      const roomId = action.payload.message.room_id
      if (!state.chatRoom || roomId === undefined) return
      let prevMessages = state.chatRoom[roomId].messages ?? []
      const msgIndex = message.nonce_id
        ? prevMessages.findIndex(
            (msg) => Number(msg.nonce_id) === +Number(message.nonce_id)
          )
        : -1
      let newMessages = [...prevMessages]
      newMessages[msgIndex] = message

      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [roomId]: {
            ...state.chatRoom[roomId],
            messages: newMessages,
          },
        },
      }
    },
    addToQueue: (
      state,
      action: PayloadAction<{ message: PartialBy<ChatItemType, "id"> }>
    ) => {
      const room_id = action.payload.message.room_id
      if (state.chatRoom === undefined) return

      if (state?.chatRoom?.[room_id] === undefined) return

      const prevMessages = state.chatRoom[room_id].messages

      let newMessages = [...prevMessages]
      return {
        ...state,
        chatRoom: {
          ...(state?.chatRoom ?? {}),
          [room_id]: {
            ...state.chatRoom[room_id],
            messages: [action.payload.message, ...newMessages],
          },
        },
      }
    },
    changeBulkRoomValues: (
      state,
      action: PayloadAction<{ values: { [key: string]: any } }>
    ) => {
      const values = action.payload.values

      return {
        ...state,
        ...values,
      }
    },
  },
  extraReducers: (builder) => {
    //ADD_INIT_MESSAGES
    builder
      .addCase(getInitMessages.pending, (state, action) => {
        const meta = action.meta
        if (meta.arg.has_loading) {
          state.loading = true
        } else {
          state.loading = false
        }
      })
      .addCase(getInitMessages.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getInitMessages.fulfilled, (state, action) => {
        const response = action.payload
        const roomId = response.room_id
        const upperLimit = response.upper_limit
        let messages = response.messages

        return {
          ...state,
          loading: false,
          isRoomChecked: true,
          chatRoom: {
            ...(state?.chatRoom ?? {}),
            [roomId]: {
              ...(state?.chatRoom?.[roomId] ?? {}),
              messages: [...messages],
              upper_limit: upperLimit,
              down_limit: 1,
            },
          },
        }
      }),
      //FETCH_NEXT_MESSAGES
      builder
        .addCase(getNextMessages.pending, (state, action) => {
          state.nextLoading = true
        })
        .addCase(getNextMessages.rejected, (state, action) => {
          state.nextLoading = false
        })
        .addCase(
          getNextMessages.fulfilled,
          (state, action: PayloadAction<any>) => {
            const response = action.payload
            const roomId = response.roomId as string
            const newMessages = response?.messages
            let newUpperLimit = action.payload.upperLimit
            let newDownLimit = action.payload.downLimit
            if (newMessages.length > 0) {
              newUpperLimit += 1
              newDownLimit += 1
            }
            //get all rooms
            const rooms = state?.chatRoom ?? {}
            //current room
            const room = rooms?.[roomId]
            if (!state.chatRoom || roomId === undefined) return

            //prev messages
            const prevMessages = [...(room?.messages ?? [])]

            let updatedMessages = []
            if (newMessages.length === 0) {
              updatedMessages = [...prevMessages]
            } else {
              updatedMessages = [
                ...prevMessages.slice(__VARS.defaultPerPage),
                ...newMessages,
              ]
            }
            return {
              ...state,
              nextLoading: false,
              chatRoom: {
                ...state.chatRoom,
                [roomId]: {
                  ...state.chatRoom[roomId],
                  down_limit: newDownLimit,
                  messages: updatedMessages,
                  upper_limit: newUpperLimit,
                },
              },
            }
          }
        ),
      //FETCH_PREV_MESSAGES
      builder
        .addCase(getPrevMessages.pending, (state, action) => {
          state.prevLoading = true
        })
        .addCase(getPrevMessages.rejected, (state, action) => {
          state.prevLoading = false
        })
        .addCase(getPrevMessages.fulfilled, (state, action: any) => {
          const response = action.payload
          const roomId = response?.roomId as string
          const newMessages = response?.messages as ChatItemType[]
          const isFirstPage = response?.isFirstPage
          //get all rooms
          const rooms = state?.chatRoom ?? {}
          //current room
          const room = rooms?.[roomId]
          if (!state.chatRoom || roomId === undefined) return

          //calc total pages based on per page and page difference
          const totalLengths =
            (__VARS.defaultPerPage / 2) * __VARS.pagesLimitDiff
          const flatIndex = totalLengths - __VARS.defaultPerPage
          //prev messages
          const prevMessages = [...(room?.messages ?? [])]
          let updatedMessages = []
          if (isFirstPage) {
            updatedMessages = [...newMessages]
          } else {
            updatedMessages = [
              ...newMessages,
              ...prevMessages.slice(0, flatIndex),
            ]
          }

          return {
            ...state,
            prevLoading: false,
            chatRoom: {
              ...state.chatRoom,
              [roomId]: {
                ...state.chatRoom[roomId],
                down_limit: response.downLimit,
                messages: updatedMessages,
                upper_limit: response.upperLimit,
              },
            },
          }
        })
  },
})

export const {
  updateMessages: updateMessagesAction,
  changeRoomItemByKey: changeRoomItemAction,
  sendMessage: sendMessageAction,
  removeMessage: removeMessageAction,
  unreadMessages: unreadMessagesAction,
  addToQueue: addToQueueAction,
  changeBulkRoomValues: changeBulkRoomValuesAction,
} = roomSlice.actions

export default roomSlice.reducer
