import React from "react";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import ChatDetails from "../details";
import { ChatType } from "@/types/chat2";
import moment from "moment";
import UnSeenMessages from "./un-seen-messages";
import { useChat } from "..";

type Props = {};

export default function ChatPreview() {
  const { chat } = useChat();

  return (
    <div className='flex flex-row items-center gap-x-2 w-full'>
      <CotopiaAvatar title={chat?.title?.slice(0, 1)} className={`w-12 h-12`} />
      <ChatDetails
        title={chat?.title}
        sub_title={
          chat?.last_message?.updated_at
            ? moment(chat?.last_message?.updated_at * 1000).format("HH:mm")
            : undefined
        }
        description={chat?.last_message?.text}
      />
      <UnSeenMessages />
    </div>
  );
}
