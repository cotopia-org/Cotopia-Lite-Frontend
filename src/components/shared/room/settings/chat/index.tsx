import CTabs from "@/components/shared-ui/c-tabs";
import React, { useCallback } from "react";
import UserChatRoom from "./room";
import UserChatDirect from "./direct";
import TabRoomTitle from "./room-title";
import ChatRoomCtxProvider, {
  RoomEnvironmentType,
} from "@/context/chat-room-context";
import { useRoomContext } from "../../room-context";
import DirectTabTitle from "./directs-title";
import { useAppDispatch } from "@/store/redux/store";
import { changeBulkRoomValuesAction } from "@/store/redux/slices/room-slice";
import RoomChats from "./room-chats";

export default function UserChat() {
  const { room_id } = useRoomContext();

  const appDispatch = useAppDispatch();

  const changeTabHandler = useCallback((val: string) => {
    let objToSend = { isRoomChecked: true, isDirectChecked: false };
    if (val === "direct") {
      objToSend["isDirectChecked"] = true;
      objToSend["isRoomChecked"] = false;
    }
    appDispatch(changeBulkRoomValuesAction({ values: objToSend }));
  }, []);

  return (
    <CTabs
      defaultValue='room'
      onChangeTab={changeTabHandler}
      className='w-full mt-4 [&_.tab-holder]:justify-center [&_.tab-content]:h-[calc(100vh-200px)]'
      items={[
        {
          title: <TabRoomTitle />,
          value: "room",
          content: (
            <ChatRoomCtxProvider
              room_id={room_id}
              environment={RoomEnvironmentType.room}
            >
              <UserChatRoom />
            </ChatRoomCtxProvider>
          ),
        },
        {
          title: <DirectTabTitle />,
          value: "direct",
          content: <UserChatDirect />,
        },
        {
          title: "New Chat (Beta)",
          value: "new-chat",
          content: <RoomChats room_id={room_id} />,
        },
      ]}
    />
  );
}
