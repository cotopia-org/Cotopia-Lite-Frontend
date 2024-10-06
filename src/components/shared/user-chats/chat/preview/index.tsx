import React from "react";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import ChatDetails from "../details";
import { ChatType } from "@/types/chat2";

type Props = {
  chat: ChatType;
};

export default function ChatPreview({ chat }: Props) {
  return (
    <div className='flex flex-row items-center gap-x-2 w-full'>
      <CotopiaAvatar title={chat?.title?.slice(0, 1)} className={`w-12 h-12`} />
      <ChatDetails chat={chat} />
    </div>
  );
}
