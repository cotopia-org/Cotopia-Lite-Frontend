import UserCalendarSettingsButtonTool from "./user-calendar";
import UserSettingsButtonTool from "./user";
import UserChatsSettingsButtonTool from "./user-chats";

export default function ChatActionsGroup() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      <UserSettingsButtonTool />
      <UserChatsSettingsButtonTool />
      <UserCalendarSettingsButtonTool />
    </div>
  );
}
