"use client";

import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { playSoundEffect } from "@/lib/sound-effects";
import { updateMessagesAction } from "@/store/redux/slices/room-slice";
import { useAppDispatch } from "@/store/redux/store";
import { ChatItemType } from "@/types/chat";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function ChatWrapper({ children }: Props) {
  const { user } = useProfile();

  const appDispatch = useAppDispatch();

  useSocket("roomMessages", (data: ChatItemType) => {
    const roomId = data.room_id;
    if (user.id !== data.user?.id) playSoundEffect("newMessage2");
    appDispatch(updateMessagesAction({ message: data, roomId: roomId }));
  });
  useSocket("directMessages", (data) => {
    const roomId = data.room_id;

    if (user.id !== data.user?.id) playSoundEffect("newMessage2");

    appDispatch(updateMessagesAction({ message: data, roomId: roomId }));
  });

  useSocket("messageSeen", (data) => {
    const roomId = data.room_id;
    const message = data.message;
    appDispatch(updateMessagesAction({ message, roomId: roomId }));
  });
  useSocket("messageUpdated", (data) => {
    const roomId = data.room_id;
    appDispatch(updateMessagesAction({ message: data, roomId: roomId }));
  });

  return <>{children}</>;
}
