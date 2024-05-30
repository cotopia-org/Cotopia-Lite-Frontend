"use client";

import UserSession from "@/app/(pages)/room/components/session";
import Background from "./backgrounds/background";
import MenuButton from "./components/menu";
import Toolbar from "./toolbar";
import TopRightTools from "./tools/top-right";
import BottomLeftTools from "./tools/bottom-left";
import BottomMiddleTools from "./tools/bottom-middle";
import BottomRightTools from "./tools/bottom-right";
import { RoomContext, useLiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import RoomUserSessions from "./sessions";
import VideoTracks from "./sessions/video-tracks";

type Props = {
  token: string;
};

export default function RoomHolder({ token }: Props) {
  const { room } = useLiveKitRoom({
    options: {
      publishDefaults: {
        videoEncoding: {
          maxBitrate: 1_500_000,
          maxFramerate: 30,
        },
        screenShareEncoding: {
          maxBitrate: 1_500_000,
          maxFramerate: 30,
        },
        dtx: true,
        // only needed if overriding defaults
        videoSimulcastLayers: [
          {
            width: 640,
            height: 360,
            resolution: {
              width: 1280,
              height: 720,
              frameRate: 30,
            },
            encoding: {
              maxBitrate: 500_000,
              maxFramerate: 20,
            },
          },
          {
            width: 320,
            height: 180,
            resolution: {
              width: 1280,
              height: 720,
              frameRate: 30,
            },
            encoding: {
              maxBitrate: 150_000,
              maxFramerate: 15,
            },
          },
        ],
      },
      videoCaptureDefaults: {
        deviceId: "",
        facingMode: "user",
        resolution: {
          width: 1280,
          height: 720,
          frameRate: 30,
        },
      },

      audioCaptureDefaults: {
        autoGainControl: true,
        deviceId: "",
        echoCancellation: true,
        noiseSuppression: true,
      },
    },
    serverUrl: __VARS.serverUrl,
    token,
    video: true,
    audio: true,
  });

  if (!room) return;

  return (
    <RoomContext.Provider value={room}>
      <div className='w-screen h-screen relative flex items-center justify-center'>
        <Background />
        <Toolbar
          topLeft={<MenuButton />}
          topRight={<TopRightTools />}
          bottomLeft={<BottomLeftTools />}
          bottomMiddle={<BottomMiddleTools />}
          bottomRight={<BottomRightTools />}
        />
        <VideoTracks room={room} />
      </div>
    </RoomContext.Provider>
  );
}
