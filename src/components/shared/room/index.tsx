"use client";

import Background from "./backgrounds/background";
import MenuButton from "./components/menu";
import Toolbar from "./toolbar";
import TopRightTools from "./tools/top-right";
import BottomLeftTools from "./tools/bottom-left";
import BottomMiddleTools from "./tools/bottom-middle";
import BottomRightTools from "./tools/bottom-right";
import { LiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import UserSessions from "./sessions";

type Props = {
  token: string;
};

export default function RoomHolder({ token }: Props) {
  return (
    <LiveKitRoom video audio token={token} serverUrl={__VARS.serverUrl}>
      <div className='w-screen h-screen relative flex items-center justify-center'>
        <Background />
        <Toolbar
          topLeft={<MenuButton />}
          topRight={<TopRightTools />}
          bottomLeft={<BottomLeftTools />}
          bottomMiddle={<BottomMiddleTools />}
          bottomRight={<BottomRightTools />}
        />
        <UserSessions />
      </div>
    </LiveKitRoom>
  );
}
