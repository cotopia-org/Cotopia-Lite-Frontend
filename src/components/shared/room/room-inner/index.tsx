import React from "react";
import { useRoomContext } from "../room-context";
import RoomSidebar from "../sidebar";
import RoomSettings from "../settings";
import LiveKitAudioManager from "../components/audio-manager";
import InitRoom from "./init-room";
import CanvasBoard from "../../canvas-board";

export default function RoomInner() {
  const { sidebar } = useRoomContext();

  let mainRoomHolderClss = "main-room-holder w-full h-screen overflow-hidden";
  if (sidebar) mainRoomHolderClss += " pr-[376px]";

  return (
    <>
      <InitRoom />
      <div id='main-room-holder' className={mainRoomHolderClss}>
        <div className='w-full h-full relative'>
          <CanvasBoard />
        </div>
        {!!sidebar && (
          <div className='fixed right-0 top-0 bottom-0 w-[376px] bg-white h-screen overflow-y-auto'>
            <RoomSidebar>
              <RoomSettings />
            </RoomSidebar>
          </div>
        )}
        <LiveKitAudioManager />
      </div>
    </>
  );
}
