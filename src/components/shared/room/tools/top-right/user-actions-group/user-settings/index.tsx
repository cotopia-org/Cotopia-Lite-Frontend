import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { FullModalBox } from "@/components/shared/modal-box";
import { Settings } from "lucide-react";
import RoomSettings from "./room-settings";

export default function UserSettingsButtonTool() {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaIconButton onClick={open} className='text-black'>
          <Settings />
        </CotopiaIconButton>
      )}
      className='w-[800px]'
    >
      {(open, close) => <RoomSettings />}
    </FullModalBox>
  );
}
