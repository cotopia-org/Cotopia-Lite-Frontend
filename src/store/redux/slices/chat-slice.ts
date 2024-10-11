import { __VARS } from "@/app/const/vars";
import axiosInstance from "@/lib/axios";
import { uniqueById } from "@/lib/utils";
import { Chat2ItemType, ChatType } from "@/types/chat2";
import { MessageType } from "@/types/message";
import { UserMinimalType } from "@/types/user";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type ChatState = {
  chats: {
    [chat_id: string]: {
      object: ChatType;
      messages: Chat2ItemType[];
      loading: boolean;
      page: number;
    };
  };
  error: string | null;
  loading: boolean;
  participants: UserMinimalType[];
};

const initialState: ChatState = {
  chats: {},
  error: null,
  loading: false,
  participants: [],
};

// Async thunk to fetch chat messages by page
export const getChats = createAsyncThunk(
  "chat/getChats",
  async ({ workspace_id }: { workspace_id: number }) => {
    const res = await axiosInstance.get(`/users/chats`, {
      params: { workspace_id },
    });

    const chats = res.data.data || [];

    return chats;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Chat2ItemType>) => {
      state.chats[action.payload.chat_id].messages = [
        action.payload,
        ...state.chats[action.payload.chat_id].messages,
      ];
    },
    updateMessage: (state, action: PayloadAction<Chat2ItemType>) => {
      state.chats[action.payload.chat_id].messages = state.chats[
        action.payload.chat_id
      ].messages.map((x) => {
        if (x.nonce_id === action.payload.nonce_id) {
          return action.payload;
        }

        return x;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getChats.fulfilled,
        (state, action: PayloadAction<ChatType[]>) => {
          let allParticipants: UserMinimalType[] = [];

          const chatObjects = action.payload;

          for (let chat of chatObjects) {
            if (state.chats[chat.id]) {
              state.chats[chat.id] = { ...state.chats[chat.id], object: chat };
            } else {
              state.chats[chat.id] = {
                loading: false,
                messages: [],
                object: chat,
                page: 1,
              };
            }
            allParticipants = [...allParticipants, ...chat.participants];
          }

          //Update all participants in redux
          state.participants = uniqueById(allParticipants) as UserMinimalType[];

          state.loading = false;
        }
      )
      .addCase(getChats.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch messages";
        state.loading = false;
      });
  },
});

export const { addMessage, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;
