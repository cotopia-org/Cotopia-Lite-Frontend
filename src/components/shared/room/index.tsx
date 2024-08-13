"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import RoomContext, { useRoomContext } from "./room-context";
import RoomInner from "./room-inner";
import { WorkspaceRoomType } from "@/types/room";
import { createContext, useContext, useEffect, useState } from "react";
import CheckPermissions from "./check-permissions";
import LiveKitConnectionStatus from "./connection-status";

export type RoomState = "retrying" | "connected" | "not-connected";

const RoomHolderContext = createContext<{
  state?: RoomState;
  changeRoomState: (state: RoomState) => void;
}>({ state: "not-connected", changeRoomState: (state) => {} });

export const useRoomHolder = () => useContext(RoomHolderContext);

type Props = {
  token: string;
  workspace_id: string;
  room_id: string;
  room?: WorkspaceRoomType;
  onRoomUpdated?: (item: WorkspaceRoomType) => void;
  socketConnected?: boolean;
};

export default function RoomHolder({
  token,
  workspace_id,
  room_id,
  room,
  onRoomUpdated,
  socketConnected,
}: Props) {
  const [state, setState] = useState<RoomState>("not-connected");

  const changeRoomState = (state: RoomState) => {
    setState(state);
  };

  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    if (state === "connected") setPermissionChecked(true);
  }, [state]);

  let content = (
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
            maxBitrate: 3_000_000,
            maxFramerate: 60,
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
      <LiveKitConnectionStatus />
      <RoomInner />
    </LiveKitRoom>
  );

  if (permissionChecked === false)
    content = <CheckPermissions onChecked={() => setPermissionChecked(true)} />;

  return (
    <RoomHolderContext.Provider value={{ changeRoomState, state }}>
      {socketConnected ? (
        <RoomContext
          room={room}
          room_id={room_id}
          onRoomUpdated={onRoomUpdated}
          workspace_id={workspace_id}
        >
          {state}
          {content}
        </RoomContext>
      ) : null}
    </RoomHolderContext.Provider>
  );
}
