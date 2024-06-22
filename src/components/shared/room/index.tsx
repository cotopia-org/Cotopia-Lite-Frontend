"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import RoomContext from "./room-context";
import RoomInner from "./room-inner";

type Props = {
  token: string;
  workspace_id: string;
  room_id: string;
};

export default function RoomHolder({ token, workspace_id, room_id }: Props) {
  return (
    <RoomContext room_id={room_id} workspace_id={workspace_id}>
      <LiveKitRoom
        video
        audio
        token={token}
        serverUrl={__VARS.serverUrl}
        options={{
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
            sampleRate: 100,
          },
        }}
      >
        <RoomInner />
      </LiveKitRoom>
    </RoomContext>
  );
}
