"use client";

import RoomSidebar from "@/components/shared/room/sidebar";
import { useRoomSpatialDrawContext } from "../../room-spatial-wrapper";
import RoomDraw from "../Draw/room-draw";
import RoomFooter from "../Footer/room-footer";
import RoomHeader from "../Header/room-header";
import LeftMiddleActions from "../left-middle-action";
import RoomSettings from "@/components/shared/room/settings";

export default function RoomSpatialContent() {
  const { openSidebar } = useRoomSpatialDrawContext();

  return (
    <>
      {openSidebar && (
        <div className="bg-black fixed right-0 w-[350px] h-screen">
          <RoomSidebar>
            <RoomSettings />
          </RoomSidebar>
        </div>
      )}

      <div className={`${openSidebar ? "col-span-9" : "col-span-12"} relative`} id="room-spatial-content">
        <RoomHeader />
        <LeftMiddleActions />
        <RoomDraw />
        <RoomFooter />
      </div>
    </>
  )
}