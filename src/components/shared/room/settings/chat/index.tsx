import CTabs from "@/components/shared-ui/c-tabs"
import React from "react"
import UserChatRoom from "./room"
import UserChatDirect from "./direct"
import TabRoomTitle from "./room-title"
import ChatRoomCtxProvider, {
  RoomEnvironmentType,
} from "@/context/chat-room-context"

export default function UserChat() {
  return (
    <CTabs
      defaultValue="room"
      className="w-full mt-4 [&_.tab-holder]:justify-center [&_.tab-content]:h-[calc(100vh-200px)]"
      items={[
        {
          title: <TabRoomTitle />,
          value: "room",
          content: (
            <ChatRoomCtxProvider environment={RoomEnvironmentType.room}>
              <UserChatRoom />
            </ChatRoomCtxProvider>
          ),
        },
        {
          title: "Direct",
          value: "direct",
          content: <UserChatDirect />,
        },
      ]}
    />
  )
}
