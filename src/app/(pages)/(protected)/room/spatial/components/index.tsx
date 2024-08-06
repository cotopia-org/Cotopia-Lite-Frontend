"use client";
import RoomSidebar from "@/components/shared/room/sidebar";
import { useRoomSpatialContext } from "../room-spatial-wrapper";
import RoomDraw from "./draw";
import Footer from "./footer";
import Header from "./header";
import LeftMiddleAction from "./left-middle-actions";
import RoomSettings from "@/components/shared/room/settings";

export default function RoomSpatialContent() {
  const { openSidebar } = useRoomSpatialContext();

  return (
    <>
      {openSidebar && (
        <div className="bg-black fixed right-0 w-[350px] h-screen">
          <RoomSidebar>
            <RoomSettings />
          </RoomSidebar>
        </div>
      )}

      <div
        className={`${openSidebar ? "col-span-9" : "col-span-12"} relative`}
        id="room-spatial-content"
      >
        <Header />
        <LeftMiddleAction />
        <RoomDraw />
        <Footer />
      </div>
    </>
  );
}
