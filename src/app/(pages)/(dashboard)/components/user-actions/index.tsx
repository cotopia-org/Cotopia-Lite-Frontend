import UserActionsAvatarButton from "./avatar";
import UserActionsMessageButton from "./message";
import UserActionsMenuButton from "./sidebar-menu";

export default function UserActions() {
  return (
    <div className='flex flex-row items-center gap-x-4'>
      <UserActionsMessageButton />
      <UserActionsAvatarButton />
      <UserActionsMenuButton />
    </div>
  );
}
