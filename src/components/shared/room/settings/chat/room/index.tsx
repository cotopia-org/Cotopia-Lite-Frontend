import ChatBox from "@/components/shared/chat-box";
import ChatUserInput from "@/components/shared/chat-box/user-input";
import { ChatItemType } from "@/types/chat";
import moment from "moment";
import React, { useCallback, useState } from "react";

export default function UserChatRoom() {
  const [messages, setMessages] = useState<ChatItemType[]>(
    [
      "4215215151251212",
      "42176478261421",
      "4218641268501",
      "4216421481276",
      "47821647218642178",
      "4126478126481246",
      "4912764745196421412",
      "8497124762147816278",
      "40128489126471264128",
      "40127498217647214621",
      "41242176478618764812",
      "49127492164782164612",
    ].map((item) => ({
      id: item,
      date: moment().unix(),
      username: "mahdi.dev",
      message: "Hi",
    }))
  );

  const handleAddMessage = useCallback((message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random() * 10000000000000,
        date: moment().unix(),
        username: "mahdi.dev",
        message,
      },
    ]);
  }, []);

  return (
    <div className='relative h-full flex flex-col justify-between  pt-8'>
      <ChatBox items={messages} />
      <ChatUserInput onAdd={handleAddMessage} />
    </div>
  );
}
