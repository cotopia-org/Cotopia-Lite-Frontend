import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";
import { DOWN_LIMIT_PAGE } from "@/context/chat-room-context";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { urlWithQueryParams } from "@/lib/utils";
import { ChatItemType } from "@/types/chat";
import { MessageType } from "@/types/message";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dispatch } from "use-bus";

export type RoomDetailsType = {
  messages: ChatItemType[];
  resend_loading?: boolean;
  upper_limit: number;
  down_limit: number;
};

export type ChatRoomSliceType = {
  [key: string]: RoomDetailsType;
};

export type InitialStateType = {
  loading: boolean;
  messages_count: {
    directs: { [key: string]: number[] };
    room: number[];
  };
  nextLoading: boolean;
  prevLoading: boolean;
  chatRoom: ChatRoomSliceType | undefined;
};

const initialState: InitialStateType = {
  loading: false,
  nextLoading: false,
  prevLoading: false,
  chatRoom: undefined,
  messages_count: {
    directs: {},
    room: [],
  },
};

export const sendMessage = createAsyncThunk(
  "room/sendMessage",
  async ({
    message,
    hasLoading = false,
    userId,
  }: {
    message: ChatItemType;
    hasLoading?: boolean;
    userId?: number;
  }) => {
    const roomId = message.room_id;

    const isDirectMessage = !!userId;

    let resMessage: ChatItemType | undefined = undefined;

    let payload: { [key: string]: any } = { text: message.text };
    if (isDirectMessage) payload["user_id"] = userId;
    if (!isDirectMessage) payload["room_id"] = roomId;

    const res = await axiosInstance.post<FetchDataType<MessageType>>(
      `/messages`,
      payload
    );
    resMessage = res?.data.data ?? undefined;

    return { message: resMessage, hasLoading };
  }
);

export const getInitMessages = createAsyncThunk(
  "room/getInitMessages",
  async ({
    room_id,
    upper_limit,
    has_loading = false,
  }: {
    room_id: string;
    has_loading: boolean;
    upper_limit: number;
  }) => {
    //calculate per page base on upper limit
    let perPage = (__VARS.defaultPerPage / 2) * upper_limit;

    const res = await axiosInstance.get(
      urlWithQueryParams(`/rooms/${room_id}/messages`, {
        page: 1,
        perPage,
      })
    );
    const data = res?.data;
    const messages: ChatItemType[] = (!!data && data?.data) || [];

    return { messages, upper_limit, room_id, has_loading };
  }
);

export const getNextMessages = createAsyncThunk(
  "room/getNextMessages",
  async ({
    room_id,
    upper_limit,
    down_limit,
  }: {
    room_id: string;
    upper_limit: number;
    down_limit: number;
  }) => {
    try {
      const res = await axiosInstance.get(
        urlWithQueryParams(`/rooms/${room_id}/messages`, {
          page: upper_limit + 1,
          perPage: __VARS.defaultPerPage,
        })
      );
      const data = res?.data;
      const items: ChatItemType[] = (!!data && data.data) || [];

      return {
        messages: items,
        upperLimit: upper_limit,
        downLimit: down_limit,
        roomId: room_id,
      };
    } catch (error) {}

    //GETTING NEXT MESSAGE SHOULD BE HANDLED HERE
  }
);

export const getPrevMessages = createAsyncThunk(
  "room/getPrevMessages",
  async ({
    room_id,
    upper_limit,
    down_limit,
  }: {
    room_id: string;
    upper_limit: number;
    down_limit: number;
  }) => {
    const newUpperLimit = upper_limit - 1;
    const newDownLimit = down_limit - 1;
    let perPage = __VARS.defaultPerPage;
    let page = newUpperLimit;
    const isFirstPage = newUpperLimit === __VARS.pagesLimitDiff;
    if (isFirstPage) {
      perPage = (__VARS.defaultPerPage / 2) * __VARS.pagesLimitDiff;
      page = DOWN_LIMIT_PAGE;
    }

    if (newDownLimit === 0) {
      return {
        messages: [],
        upperLimit: upper_limit,
        downLimit: down_limit,
      };
    }

    try {
      const res = await axiosInstance.get(
        urlWithQueryParams(`/rooms/${room_id}/messages`, {
          page: page,
          perPage: perPage,
        })
      );
      const data = res?.data;

      const items: ChatItemType = (!!data && data.data) || [];

      return {
        messages: items,
        upperLimit: newUpperLimit,
        isFirstPage: isFirstPage,
        downLimit: newDownLimit,
        roomId: room_id,
      };
    } catch (error) {}
    //GETTING NEXT MESSAGE SHOULD BE HANDLED HERE
  }
);

const roomSlice = createSlice({
  name: "room-slice",
  initialState: initialState,
  reducers: {
    unreadMessages: (
      state,
      action: PayloadAction<{
        message: ChatItemType;
        messageType: "direct" | "room" | "seen";

        myAccountId?: number;
      }>
    ) => {
      const message = action.payload.message;

      const roomId = "" + message.room_id;

      const messageType = action.payload?.messageType ?? undefined;

      let prevMsgsCount = state.messages_count;
      /**handle notifications count here */
      const isMyMessage = message?.user?.id === action.payload.myAccountId;

      //collect all last room messages ids
      let prevRoomMsgIds = prevMsgsCount?.room ?? [];

      let newRoomIds = [...prevRoomMsgIds];

      //select prev dm messages object
      let prevDmMsg = prevMsgsCount.directs;

      let currRoomIds = prevDmMsg?.[roomId] ?? [];
      //collect all last direct messages ids
      let prevDmMsgIds = Object.keys(prevDmMsg) ?? [];

      //collect add dm message ids
      let newDmIds = [...prevDmMsgIds];

      let newDmRoomIds = [...currRoomIds];

      switch (messageType) {
        case "direct":
          if (!isMyMessage && !message.seen) {
            if (newDmIds.includes(roomId)) {
              newDmRoomIds = [...currRoomIds, message.id];
            } else {
              newDmRoomIds = [message.id];
            }
          }
          break;
        case "room":
          if (!isMyMessage && !message.seen) {
            newRoomIds = [...prevRoomMsgIds, message.id];
          }
          break;
        case "seen":
          let isDmExist = newDmRoomIds.includes(message.id);
          let isRoomExist = prevRoomMsgIds.includes(message.id);
          if (isDmExist) {
            newDmRoomIds = newDmRoomIds.filter((msgId) => msgId !== message.id);
          } else if (isRoomExist) {
            newRoomIds = prevRoomMsgIds.filter((msgId) => msgId !== message.id);
          }
          break;
        default:
          break;
      }
      return {
        ...state,
        messages_count: {
          room: newRoomIds,
          directs: {
            ...prevDmMsg,
            [roomId]: newDmRoomIds,
          },
        },
      };
    },
    updateMessages: (
      state,
      action: PayloadAction<{
        message: ChatItemType;
      }>
    ) => {
      if (state?.chatRoom === undefined) return;
      const message = action.payload.message;
      const roomId = message.room_id;
      const prevMessages = state.chatRoom?.[roomId]?.messages ?? [];
      const chatIds = prevMessages.map((x: any) => x.id);
      const foundIndex = chatIds.indexOf(message.id);

      let newMessages = [...prevMessages];
      if (foundIndex > -1) {
        newMessages[foundIndex] = message;
      } else {
        newMessages = [message, ...prevMessages];
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
      };
    },
    sendMessage: (state, action: PayloadAction<{ message: ChatItemType }>) => {
      const message = action.payload.message;
      const roomId = message.room_id;
      if (!state.chatRoom || roomId === undefined) return;

      const prevMessages = state.chatRoom[roomId].messages ?? [];
      const msgIndex = prevMessages.findIndex(
        (msg) => msg.nonce_id === message.nonce_id
      );

      let newMessages = [...prevMessages];
      if (msgIndex >= 0) {
        newMessages[msgIndex] = message;
      } else {
        newMessages = [message, ...newMessages];
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
      };
    },
    changeRoomItemByKey: (
      state,
      action: PayloadAction<{
        roomId: number;
        key: keyof RoomDetailsType;
        value: any;
      }>
    ) => {
      const { payload } = action;
      if (!state?.chatRoom || !state?.chatRoom?.[payload.roomId]) return;
      let targetRoom = state.chatRoom[payload.roomId];
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [payload.roomId]: {
            ...targetRoom,
            [payload.key]: payload.value,
          },
        },
      };
    },
    removeMessage: (
      state,
      action: PayloadAction<{ message: ChatItemType }>
    ) => {
      const message = action.payload.message;
      const roomId = action.payload.message.room_id;
      if (!state.chatRoom || roomId === undefined) return;
      let prevMessages = state.chatRoom[roomId].messages ?? [];
      const msgIndex = prevMessages.findIndex(
        (msg) => msg.nonce_id === message.nonce_id
      );
      let newMessages = [...prevMessages];
      newMessages[msgIndex] = message;

      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [roomId]: {
            ...state.chatRoom[roomId],
            messages: newMessages,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    //SEND MESSAGE
    builder
      .addCase(sendMessage.pending, (state, action) => {
        const payload = action.meta.arg;
        const message = payload.message;
        const roomId = message.room_id;
        //check for is that we have is_sent field
        const hasSent = message?.is_sent ?? undefined;
        const chatRoom = state?.chatRoom ?? {};
        const currentRoom = chatRoom?.[roomId] ?? {};
        if (chatRoom === undefined || currentRoom === undefined) return state;
        const prevMessages = currentRoom?.messages ?? [];
        let newMessages = [...prevMessages];
        const messageText = message.text
          .toLocaleLowerCase()
          .replaceAll(" ", "")
          .trim();
        const msgIndex = prevMessages.findIndex(
          (msg) => msg.nonce_id === message.nonce_id
        );
        if (msgIndex >= 0 && hasSent === undefined) {
          newMessages[msgIndex] = message;
        } else {
          newMessages = [message, ...prevMessages];
        }
        dispatch(_BUS.scrollEndChatBox);
        return {
          ...state,
          chatRoom: {
            ...state.chatRoom,
            [roomId]: {
              ...currentRoom,
              resend_loading: payload.hasLoading,
              messages: newMessages,
            },
          },
        };
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const payload = action.meta.arg;
        const message = { ...payload.message, is_sent: false };
        const roomId = message.room_id;
        const chatRoom = state?.chatRoom ?? {};
        const currentRoom = chatRoom?.[roomId] ?? {};
        if (chatRoom === undefined || currentRoom === undefined) return state;
        const prevMessages = [...currentRoom.messages];
        const msgIndex = prevMessages.findIndex(
          (msg) => msg.nonce_id === message.nonce_id
        );
        let newMessages = [...prevMessages];
        newMessages[msgIndex] = message;
        dispatch(_BUS.scrollEndChatBox);
        return {
          ...state,
          chatRoom: {
            ...state.chatRoom,
            [roomId]: {
              ...currentRoom,
              resend_loading: false,
              messages: newMessages,
            },
          },
        };
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload.message;
        const roomId = message.room_id;
        const chatRoom = state?.chatRoom ?? {};
        if (chatRoom === undefined || roomId === undefined) return;
        const currentRoom = chatRoom[roomId];
        const prevMessages = currentRoom?.messages ?? [];
        const msgIndex = prevMessages.findIndex(
          (msg) => msg.nonce_id === message.nonce_id
        );
        let newMessages = [...prevMessages];
        newMessages[msgIndex] = message;

        return {
          ...state,
          chatRoom: {
            ...state.chatRoom,
            [roomId]: {
              ...currentRoom,
              resend_loading: false,
              messages: newMessages,
            },
          },
        };
      }),
      //ADD_INIT_MESSAGES
      builder
        .addCase(getInitMessages.pending, (state, action) => {
          const meta = action.meta;
          if (meta.arg.has_loading) {
            state.loading = true;
          } else {
            state.loading = false;
          }
        })
        .addCase(getInitMessages.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(getInitMessages.fulfilled, (state, action) => {
          const response = action.payload;
          const roomId = response.room_id;
          const upperLimit = response.upper_limit;
          const messages = response.messages;
          return {
            ...state,
            loading: false,
            chatRoom: {
              ...(state?.chatRoom ?? {}),
              [roomId]: {
                ...(state?.chatRoom?.[roomId] ?? {}),
                isFetched: true,
                messages,
                upper_limit: upperLimit,
                down_limit: 1,
              },
            },
          };
        }),
      //FETCH_NEXT_MESSAGES
      builder
        .addCase(getNextMessages.pending, (state, action) => {
          state.nextLoading = true;
        })
        .addCase(getNextMessages.rejected, (state, action) => {
          state.nextLoading = false;
        })
        .addCase(
          getNextMessages.fulfilled,
          (state, action: PayloadAction<any>) => {
            const response = action.payload;
            const roomId = response.roomId as string;
            const newMessages = response?.messages;
            let newUpperLimit = action.payload.upperLimit;
            let newDownLimit = action.payload.downLimit;
            if (newMessages.length > 0) {
              newUpperLimit += 1;
              newDownLimit += 1;
            }
            //get all rooms
            const rooms = state?.chatRoom ?? {};
            //current room
            const room = rooms?.[roomId];
            if (!state.chatRoom || roomId === undefined) return;

            //prev messages
            const prevMessages = [...(room?.messages ?? [])];

            let updatedMessages = [];
            if (newMessages.length === 0) {
              updatedMessages = [...prevMessages];
            } else {
              updatedMessages = [
                ...prevMessages.slice(__VARS.defaultPerPage),
                ...newMessages,
              ];
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
            };
          }
        ),
      //FETCH_PREV_MESSAGES
      builder
        .addCase(getPrevMessages.pending, (state, action) => {
          state.prevLoading = true;
        })
        .addCase(getPrevMessages.rejected, (state, action) => {
          state.prevLoading = false;
        })
        .addCase(getPrevMessages.fulfilled, (state, action: any) => {
          const response = action.payload;
          const roomId = response?.roomId as string;
          const newMessages = response?.messages as ChatItemType[];
          const isFirstPage = response?.isFirstPage;
          //get all rooms
          const rooms = state?.chatRoom ?? {};
          //current room
          const room = rooms?.[roomId];
          if (!state.chatRoom || roomId === undefined) return;

          //calc total pages based on per page and page difference
          const totalLengths =
            (__VARS.defaultPerPage / 2) * __VARS.pagesLimitDiff;
          const flatIndex = totalLengths - __VARS.defaultPerPage;
          //prev messages
          const prevMessages = [...(room?.messages ?? [])];
          let updatedMessages = [];
          if (isFirstPage) {
            updatedMessages = [...newMessages];
          } else {
            updatedMessages = [
              ...newMessages,
              ...prevMessages.slice(0, flatIndex),
            ];
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
          };
        });
  },
});

export const {
  updateMessages: updateMessagesAction,
  changeRoomItemByKey: changeRoomItemAction,
  sendMessage: sendMessageAction,
  removeMessage: removeMessageAction,
  unreadMessages: unreadMessagesAction,
} = roomSlice.actions;

export default roomSlice.reducer;
