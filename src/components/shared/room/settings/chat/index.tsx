import React from "react";
import WorkspaceChats from "@/components/shared/user-chats/shapes/workspace-chats";
import { useRoomContext } from "../../room-context";

export default function UserChat() {
  const { workspace_id } = useRoomContext();

  if (!workspace_id) return;

  return (
    <>
      <WorkspaceChats workspace_id={+workspace_id} />
    </>
    // <CTabs
    //   defaultValue='room'
    //   onChangeTab={changeTabHandler}
    //   className='w-full mt-4 [&_.tab-holder]:justify-center [&_.tab-content]:h-[calc(100vh-200px)]'
    //   items={[
    //     {
    //       title: <TabRoomTitle />,
    //       value: "room",
    //       content: (
    //         <ChatRoomCtxProvider
    //           room_id={room_id}
    //           environment={RoomEnvironmentType.room}
    //         >
    //           <UserChatRoom />
    //         </ChatRoomCtxProvider>
    //       ),
    //     },
    //     {
    //       title: <DirectTabTitle />,
    //       value: "direct",
    //       content: <UserChatDirect />,
    //     },
    //     {
    //       title: "New Chat (Beta)",
    //       value: "new-chat",
    //       content: <RoomChats room_id={room_id} />,
    //     },
    //   ]}
    // />
  );
}
