import InviteButtonTool from "../Invite"
import UserAvatarButtonTool from "./user-avatar"
import UserLogoutButtonTool from "./user-logout"
import UserSettingsButtonTool from "./user-settings"

export default function UserActionsGroup() {
  return (
    <div className="flex h-[48px] flex-row items-center bg-white gap-x-2 rounded-lg px-4">
      <InviteButtonTool />
      <UserSettingsButtonTool />
      <UserAvatarButtonTool />
      <UserLogoutButtonTool />
    </div>
  )
}
