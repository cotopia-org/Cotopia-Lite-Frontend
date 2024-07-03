import TitleSwitch from "@/components/shared/title-switch";
import React from "react";

export default function GlobalSettings() {
  return (
    <div className='flex flex-col gap-y-4'>
      <TitleSwitch title='Notifications have sound' />
    </div>
  );
}
