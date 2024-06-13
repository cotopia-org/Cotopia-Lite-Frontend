import CTabs from "@/components/shared-ui/c-tabs";
import React from "react";

export default function BackgroundSetting() {
  return (
    <CTabs
      title='Background'
      titleClassName='text-base text-gray-700'
      defaultValue='gallery'
      items={[
        {
          title: "Gallery",
          value: "gallery",
          content: <>Gallery</>,
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
