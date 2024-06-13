import CTabs from "@/components/shared-ui/c-tabs";
import React from "react";
import BackgroundSetting from "./background";
import PermissionsSetting from "./permissions";

export default function RoomSettings() {
  return (
    <CTabs
      title='Room Settings'
      titleClassName='text-xl'
      items={[
        {
          title: "Background",
          value: "background",
          content: <BackgroundSetting />,
        },
        {
          title: "Permissions",
          value: "permissions",
          content: <PermissionsSetting />,
        },
      ]}
      className='pt-6'
      dividerBetweenContentAndTabs
    />
  );
}
