import React from "react";
import Background from "../backgrounds/background";
import Toolbar from "../toolbar";
import MenuButton from "../components/workspace-button";
import TopRightTools from "../tools/top-right";
import BottomLeftTools from "../tools/bottom-left";
import BottomMiddleTools from "../tools/bottom-middle";
import BottomRightTools from "../tools/bottom-right";
import UserSessions from "../sessions";
import { useRoomContext } from "../room-context";
import RoomSidebar from "../sidebar";
import RoomSettings from "../settings";
import LiveKitAudioManager from "../components/audio-manager";
import TopLeftTools from "../toolbar/top-left";

export default function RoomInner() {
  const { sidebar } = useRoomContext();

  let mainRoomHolderClss = "main-room-holder w-screen h-screen";
  if (sidebar) mainRoomHolderClss += " pr-[376px]";

  return (
    <div className={mainRoomHolderClss}>
      <div className='w-full h-full relative flex items-center justify-center'>
        <Background />
        <Toolbar
          topLeft={<TopLeftTools />}
          topRight={<TopRightTools />}
          bottomLeft={<BottomLeftTools />}
          bottomMiddle={<BottomMiddleTools />}
          bottomRight={<BottomRightTools />}
        />
        <UserSessions />
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
  );
}
