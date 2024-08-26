import CTabs from "@/components/shared-ui/c-tabs"
import React from "react"
import UserChatRoom from "./room"
import UserChatDirect from "./direct"
import TabRoomTitle from "./room-title"
import ChatRoomCtxProvider, {
  RoomSoocketType,
} from "@/context/chat-room-context"
import { useRoomContext } from "../../room-context"

export default function UserChat() {
  const { room_id } = useRoomContext()

  return (
    <CTabs
      defaultValue="room"
      className="w-full mt-4 [&_.tab-holder]:justify-center [&_.tab-content]:h-[calc(100vh-200px)]"
      items={[
        {
          title: <TabRoomTitle />,
          value: "room",
          content: (
            <ChatRoomCtxProvider
              endpoint={`/rooms/${room_id}/messages`}
              type={RoomSoocketType.room}
            >
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
