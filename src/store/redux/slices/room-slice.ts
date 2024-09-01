import { __VARS } from "@/app/const/vars";
import { DOWN_LIMIT_PAGE } from "@/context/chat-room-context";
import axiosInstance from "@/lib/axios";
import { urlWithQueryParams } from "@/lib/utils";
import { ChatItemType } from "@/types/chat";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type RoomDetailsType = {
  messages: ChatItemType[];
  new_messages?: number;
  upper_limit: number;
  down_limit: number;
};

export type ChatRoomSliceType = {
  [key: string]: RoomDetailsType;
};

export type InitialStateType = {
  loading: boolean;
  nextLoading: boolean;
  prevLoading: boolean;
  chatRoom: ChatRoomSliceType | undefined;
};

const initialState: InitialStateType = {
  loading: false,
  nextLoading: false,
  prevLoading: false,
  chatRoom: {},
};

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
    updateMessages: (
      state,
      action: PayloadAction<{
        message: ChatItemType;
        roomId: string | number;
        type?: "static" | "socket";
      }>
    ) => {
      if (!state.chatRoom) return;

      const message = action.payload.message;

      const roomId = action.payload.roomId;

      const changeType = action?.payload?.type;
      const prevMessages = state.chatRoom?.[roomId]?.messages ?? [];
      const chatIds = prevMessages.map((x: any) => x.id);
      const foundIndex = chatIds.indexOf(message.id);
      let newMessages = [...prevMessages];
      let count = state?.chatRoom[roomId]?.new_messages ?? 0;
      if (foundIndex > -1) {
        newMessages[foundIndex] = message;
      } else if (changeType && foundIndex <= -1) {
        newMessages = [message, ...prevMessages];
      } else {
        count += 1;
        newMessages = [message, ...prevMessages];
        //Badge on nav button should be handle here
      }
      return {
        ...state,
        chatRoom: {
          ...state.chatRoom,
          [roomId]: {
            ...state.chatRoom[roomId],
            new_messages: count,
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
      const msgIndex = prevMessages.findIndex((msg) => msg.id === message.id);
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
            ...state.chatRoom,
            [roomId]: {
              ...(state?.chatRoom?.[roomId] ?? {}),
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
            const rooms = state.chatRoom;
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
          const rooms = state.chatRoom;
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
  removeMessage: removeMessageAction,
} = roomSlice.actions;

export default roomSlice.reducer;
