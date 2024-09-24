import { __VARS } from "@/app/const/vars";
import axiosInstance from "@/lib/axios";
import { Chat2ItemType } from "@/types/chat2";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type ChatState = {
  chats: {
    [chat_id: string]: {
      messages: Chat2ItemType[];
      loading: boolean;
      page: number;
    };
  };
  error: string | null;
};

const initialState: ChatState = {
  chats: {},
  error: null,
};

// Async thunk to fetch chat messages by page
export const getChatMessages = createAsyncThunk(
  "chat/getMessages",
  async ({ chat_id, page }: { chat_id: number; page: number }) => {
    const perPage = __VARS.defaultPerPage;
    const res = await axiosInstance.get(`/rooms/${chat_id}/messages`, {
      params: { page, perPage },
    });

    const messages = res.data.data || [];
    return { chat_id, messages, page };
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatMessages.pending, (state, action) => {
        const { chat_id } = action.meta.arg;
        state.chats[chat_id] = state.chats[chat_id] || {
          messages: [],
          loading: false,
          page: 1,
        };
        state.chats[chat_id].loading = true;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        const { chat_id, messages, page } = action.payload;
        const chat = state.chats[chat_id] || { messages: [], page: 1 };

        // Prepend new messages when fetching older messages (scrolling up)
        chat.messages = [...chat.messages, ...messages];
        chat.page = page;
        chat.loading = false;

        state.chats[chat_id] = chat;
      })
      .addCase(getChatMessages.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch messages";
        const { chat_id } = action.meta.arg;
        state.chats[chat_id].loading = false;
      });
  },
});

export default chatSlice.reducer;
