import { useAppDispatch, useAppSelector } from "@/store/redux/store";
import React, { useEffect, useState } from "react";
import Chat2 from "@/components/shared/chat-box-2";
import { __VARS } from "@/app/const/vars";

type Props = {
  room_id: number;
};

export default function RoomChats({ room_id }: Props) {
  const dispatch = useAppDispatch();

  const chats = useAppSelector((state) => state.chatSlice.chats);
  const messages = chats[room_id]?.messages ?? [];
  const loading = chats[room_id]?.loading ?? false;
  const currentPage = chats[room_id]?.page ?? 1;

  const [page, setPage] = useState(currentPage);
  const [isLastPage, setIsLastPage] = useState(false);

  // Fetch initial messages on mount
  useEffect(() => {
    // if (messages.length === 0) {
    //   dispatch(getChatMessages({ chat_id: room_id, page: currentPage }));
    // }
  }, [dispatch, room_id, currentPage, messages.length]);

  // Handle fetching more messages when reaching the top
  const handleFetchNewMessages = async () => {
    // if (isLastPage) return;
    // if (!loading) {
    //   const nextPage = page + 1;
    //   thunkResHandler(
    //     dispatch(getChatMessages({ chat_id: room_id, page: nextPage })),
    //     "chat/getMessages",
    //     (res) => {
    //       setPage(nextPage);
    //       if (res.payload.messages.length < __VARS.defaultPerPage) {
    //         setIsLastPage(true);
    //       }
    //     },
    //     (err) => {}
    //   );
    // }
  };

  //Handle add message
  const handleAddMessage = (message: string) => {};

  return null;

  // return (
  //   <Chat2
  //     items={messages}
  //     addMessage={(text) => console.log("text", text)}
  //     onFetchNewMessages={() =>
  //       new Promise((res) => {
  //         setTimeout(async () => {
  //           await handleFetchNewMessages(); // Call your fetch handler
  //           res(); // Resolve the promise after fetching new messages
  //         }, 1000);
  //       })
  //     }
  //     getUser={() =}
  //   />
  // );
}
