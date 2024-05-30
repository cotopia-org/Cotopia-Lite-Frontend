import UserCalendarSettingsButtonTool from "./user-calendar";
import UserChatSettingsButtonTool from "./user-chat";
import UserChatsSettingsButtonTool from "./user-chats";

export default function ChatActionsGroup() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      <UserChatSettingsButtonTool />
      <UserChatsSettingsButtonTool />
      <UserCalendarSettingsButtonTool />
    </div>
  );
}
