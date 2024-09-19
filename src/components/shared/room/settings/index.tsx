import React, { ReactNode, useState } from "react";
import CTabs from "@/components/shared-ui/c-tabs";
import { AudioLines, MessagesSquare, Users } from "lucide-react";
import SettingsChatAction from "./chat/action";
import UserChat from "./chat";
import WorkspaceSidebar from "@/app/(pages)/(protected)/workspaces/sidebar";
import WorkspaceUsers from "./users";
import { useAppSelector } from "@/store/redux/store";
import CBadgeSimple from "@/components/shared-ui/c-badge/c-badge-simple";

export default function RoomSettings() {
  const roomSlice = useAppSelector((state) => state.roomSlice);

  const messagesCount = roomSlice?.messages_count ?? { room: [], objects: {} };

  const roomIds = messagesCount.room;
  const directsIds = Object?.values(messagesCount.directs).flatMap(
    (item) => item
  );

  const totalCount = roomIds.length + directsIds.length;

  const [value, setValue] = useState("rooms");

  let title: ReactNode = "";
  switch (value) {
    case "chat":
      title = <SettingsChatAction />;
      break;
  }

  return (
    <div className='p-6 flex flex-col gap-y-4'>
      <CTabs
        title={<div>{title}</div>}
        defaultValue={value}
        onChangeTab={setValue}
        className='[&_.tab-content>*]:px-0'
        items={[
          {
            icon: <AudioLines />,
            content: <WorkspaceSidebar />,
            value: "rooms",
          },
          {
            icon: (
              <CBadgeSimple count={totalCount}>
                <MessagesSquare />
              </CBadgeSimple>
            ),
            content: <UserChat />,
            value: "chat",
          },
          {
            icon: <Users />,
            content: <WorkspaceUsers />,
            value: "users",
          },
        ]}
      />
    </div>
  );
}
