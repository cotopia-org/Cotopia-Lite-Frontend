import UserCalendarSettingsButtonTool from "./user-calendar";
import UserSettingsButtonTool from "./user";
import UserChatsSettingsButtonTool from "./user-chats";
import { useRoomContext } from "../../../room-context";
import CloseSidebar from "./close-sidebar";
import { useAppSelector } from "@/store/redux/store";
import CBadge from "@/components/shared-ui/c-badge";

export default function ChatActionsGroup() {
  const { sidebar, closeSidebar } = useRoomContext();

  const roomSlice = useAppSelector((state) => state.roomSlice);

  // const messagesCount = roomSlice?.messages_count ?? []

  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      {!!sidebar ? (
        <CloseSidebar onClick={closeSidebar} />
      ) : (
        <>
          {/* <UserSettingsButtonTool /> */}

          <UserChatsSettingsButtonTool />

          <UserCalendarSettingsButtonTool />
        </>
      )}
    </div>
  );
}
