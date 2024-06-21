import CTabs from "@/components/shared-ui/c-tabs";
import React from "react";
import Gallery from "./gallery";
import { useRoomContext } from "@/components/shared/room/room-context";

export default function BackgroundSetting() {
  const { room_id, workspace_id } = useRoomContext();

  if (!room_id) {
    return;
  }

  if (!workspace_id) {
    return;
  }

  return (
    <CTabs
      title='Background'
      titleClassName='text-base text-gray-700'
      defaultValue='gallery'
      items={[
        {
          title: "Gallery",
          value: "gallery",
          content: <Gallery room_id={room_id} workspace_id={workspace_id} />,
        },
        {
          title: "Room Settings",
          value: "room-settings",
          content: <>This feature will be ready in the soon future.</>,
        },
      ]}
    />
  );
}
