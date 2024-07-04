"use client";

import React, { ReactNode, useState } from "react";
import CTabs from "@/components/shared-ui/c-tabs";
import { CalendarDays, MessagesSquare, User } from "lucide-react";
import SettingsUserAction from "./user/action";
import SettingsChatAction from "./chat/action";
import UserChat from "./chat";

export default function RoomSettings() {
  const [value, setValue] = useState("chat");

  let title: ReactNode = "";
  switch (value) {
    case "user":
      title = <SettingsUserAction />;
      break;
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
        items={[
          {
            icon: <User />,
            content: <>xx</>,
            value: "user",
          },
          {
            icon: <MessagesSquare />,
            content: <UserChat />,
            value: "chat",
          },
          {
            icon: <CalendarDays />,
            content: <>xx</>,
            value: "calendar",
          },
        ]}
      />
    </div>
  );
}
