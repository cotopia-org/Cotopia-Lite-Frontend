import TitleSwitch from "@/components/shared/title-switch";
import useSetting from "@/hooks/use-setting";
import { toggleSoundSettingAction } from "@/store/redux/slices/setting-slice";
import { useAppDispatch } from "@/store/redux/store";
import React from "react";

export default function GlobalSettings() {
  const setting = useSetting();
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col gap-y-4'>
      <TitleSwitch
        title='User join/left has sound'
        checked={setting.sounds.userJoinLeft}
        onCheckedChange={() =>
          dispatch(toggleSoundSettingAction({ key: "userJoinLeft" }))
        }
      />
      <TitleSwitch
        title='Message incoming has sound'
        checked={setting.sounds.messageIncoming}
        onCheckedChange={() =>
          dispatch(toggleSoundSettingAction({ key: "messageIncoming" }))
        }
      />
    </div>
  );
}
