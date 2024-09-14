import React, { useEffect } from "react";
import Toolbar from "../toolbar";
import TopRightTools from "../tools/top-right";
import BottomLeftTools from "../tools/bottom-left";
import BottomMiddleTools from "../tools/bottom-middle";
import BottomRightTools from "../tools/bottom-right";
import { useRoomContext } from "../room-context";
import RoomSidebar from "../sidebar";
import RoomSettings from "../settings";
import LiveKitAudioManager from "../components/audio-manager";
import TopLeftTools from "../tools/top-left";
import InitRoom from "./init-room";
import CanvasBoard from "../../canvas-board";
export default function RoomInner() {
  const { sidebar, joinRoom } = useRoomContext();

  let mainRoomHolderClss = "main-room-holder w-full h-screen overflow-hidden";
  if (sidebar) mainRoomHolderClss += " pr-[376px]";

  useEffect(() => {
    joinRoom();
  }, []);

  return (
    <>
      <InitRoom />
      <div id='main-room-holder' className={mainRoomHolderClss}>
        <div className='w-full h-full relative'>
          {/* <Background /> */}
          <Toolbar
            topLeft={<TopLeftTools />}
            topRight={<TopRightTools />}
            bottomLeft={<BottomLeftTools />}
            bottomMiddle={<BottomMiddleTools />}
            bottomRight={<BottomRightTools />}
          />
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
