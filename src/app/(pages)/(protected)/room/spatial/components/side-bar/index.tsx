import RoomSettings from "@/components/shared/room/settings";
import RoomSidebar from "@/components/shared/room/sidebar";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function SideBar() {
  const { openSidebar } = useRoomSpatialContext();

  return (
    <>
      {openSidebar && (
        <div className="bg-black fixed right-0 w-[350px] h-screen z-50">
          <RoomSidebar>
            <RoomSettings />
          </RoomSidebar>
        </div>
      )}
    </>
  );
}
