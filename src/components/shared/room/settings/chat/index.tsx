import CTabs from "@/components/shared-ui/c-tabs";
import React from "react";
import UserChatRoom from "./room";
import UserChatDirect from "./direct";

export default function UserChat() {
  return (
    <CTabs
      defaultValue='room'
      className='w-full mt-4 [&_.tab-holder]:justify-center [&_.tab-content]:h-[calc(100vh-164px)]'
      items={[
        {
          title: "Room",
          value: "room",
          content: <UserChatRoom />,
        },
        {
          title: "Direct",
          value: "direct",
          content: <UserChatDirect />,
        },
      ]}
    />
  );
}
