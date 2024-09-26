"use client";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
import Footer from "./footer";
import Header from "./header";
import LeftMiddleAction from "./left-middle-actions";
import SideBar from "./side-bar";
import CanvasWithFlow from "./canvas-with-flow";

export default function RoomSpatialContent() {
  const { openSidebar } = useRoomSpatialContext();

  return (
    <>
      <SideBar />

      <div
        className={`${
          openSidebar ? "col-span-9" : "col-span-12"
        } relative z-40 h-screen flex flex-col`}
        id="room-spatial-content"
      >
        <Header />

        <div className="flex-grow relative">
          <LeftMiddleAction />
          <CanvasWithFlow />
        </div>
        <Footer />
      </div>
    </>
  );
}
