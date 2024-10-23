import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import { FullModalBox } from "@/components/shared/modal-box"
import RoomSettings from "./room-settings"
import { SettingIcon } from "@/components/icons"
import colors from "tailwindcss/colors"

export default function UserSettingsButtonTool() {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaIconButton onClick={open} className="w-6 h-6">
          <SettingIcon size={20} color={colors.black} />
        </CotopiaIconButton>
      )}
      className="w-[800px]"
    >
      {(open, close) => <RoomSettings />}
    </FullModalBox>
  )
}
