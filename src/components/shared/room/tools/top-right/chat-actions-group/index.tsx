import UserCalendarSettingsButtonTool from "./user-calendar";
import UserChatsSettingsButtonTool from "./user-chats";
import { useRoomContext } from "../../../room-context";
import CloseSidebar from "./close-sidebar";

export default function ChatActionsGroup() {
  const { sidebar, closeSidebar } = useRoomContext();

  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      {!!sidebar ? (
        <CloseSidebar onClick={closeSidebar} />
      ) : (
        <>
          <UserChatsSettingsButtonTool />
          {/* <UserCalendarSettingsButtonTool /> */}
        </>
      )}
    </div>
  );
}
