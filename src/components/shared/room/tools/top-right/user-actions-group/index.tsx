import UserAvatarButtonTool from "./user-avatar";
import UserLogoutButtonTool from "./user-logout";
import UserSettingsButtonTool from "./user-settings";

export default function UserActionsGroup() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      <UserSettingsButtonTool />
      <UserAvatarButtonTool />
      <UserLogoutButtonTool />
    </div>
  );
}
