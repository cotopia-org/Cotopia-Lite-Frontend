import React from "react";
import ChatPreview from "../preview";
import { ChatType } from "@/types/chat2";
import BackHolder from "./back";

type Props = {
  chat: ChatType;
  onBack: () => void;
};

export default function ChatInnerHolder({ chat, onBack }: Props) {
  return (
    <div className='flex flex-col gap-y-2 w-full'>
      <div className='flex flex-row items-center gap-x-2'>
        <BackHolder onClick={onBack} />
        <ChatPreview chat={chat} />
      </div>
      xx
    </div>
  );
}
