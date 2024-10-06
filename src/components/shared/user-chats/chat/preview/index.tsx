import React from "react";
import { useChat } from "..";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";

export default function ChatPreview() {
  const { chat } = useChat();

  return (
    <div>
      <CotopiaAvatar title={chat.title.slice(0, 1)} className={`w-12 h-12`} />
    </div>
  );
}
