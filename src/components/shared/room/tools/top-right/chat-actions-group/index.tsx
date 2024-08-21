import UserCalendarSettingsButtonTool from "./user-calendar";
import UserSettingsButtonTool from "./user";
import UserChatsSettingsButtonTool from "./user-chats";
import { useRoomContext } from "../../../room-context";
import CloseSidebar from "./close-sidebar";
import { useRoomSpatialContext } from "@/app/(pages)/(protected)/room/spatial/room-spatial-wrapper";

export default function ChatActionsGroup() {
  // const { sidebar, closeSidebar } = useRoomContext();
    const { openSidebar , setOpenSidebar } = useRoomSpatialContext();

  function handleCloseSidebar() {
    setOpenSidebar(prevState => false)
  }

  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      {openSidebar ? (
        <CloseSidebar onClick={handleCloseSidebar} />
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
