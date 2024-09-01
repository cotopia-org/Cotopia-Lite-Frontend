"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { __VARS } from "@/app/const/vars";
import RoomContext from "./room-context";
import RoomInner from "./room-inner";
import { WorkspaceRoomType } from "@/types/room";
import { createContext, useContext, useEffect, useState } from "react";
import LiveKitConnectionStatus from "./connection-status";
import CheckPermissions2, { useMediaPermissions } from "./check-permissions-2";
import ChatWrapper from "../chat-wrapper";

type MediaPermission = {
  audio: boolean;
  video: boolean;
};

const DEFAULT_MEDIA_PERMISSIONS = {
  audio: true,
  video: true,
};

const RoomHolderContext = createContext<{
  mediaPermissions: MediaPermission;
  changeMediaPermission: (perms: MediaPermission) => void;
}>({
  mediaPermissions: DEFAULT_MEDIA_PERMISSIONS,
  changeMediaPermission: (perms) => {},
});

export const useRoomHolder = () => useContext(RoomHolderContext);

type Props = {
  token: string;
  workspace_id: string;
  room_id: string;
  room?: WorkspaceRoomType;
  onRoomUpdated?: (item: WorkspaceRoomType) => void;
  isReConnecting?: boolean;
};

export default function RoomHolder({
  token,
  workspace_id,
  room_id,
  room,
  onRoomUpdated,
  isReConnecting,
}: Props) {
  const [currentMediaPermissions, setCurrentMediaPermissions] = useState<{
    audio: boolean;
    video: boolean;
  }>({ audio: false, video: false });

  const mediaPermissions = useMediaPermissions();
  useEffect(() => {
    if (mediaPermissions) {
      setCurrentMediaPermissions(mediaPermissions);
    }
  }, [mediaPermissions]);

  const changeMediaPermission = (state: MediaPermission) => {
    setCurrentMediaPermissions(state);
    localStorage.setItem("media-permission", JSON.stringify(state));
  };

  const [permissionChecked, setPermissionChecked] = useState(false);

  let content = (
    <LiveKitRoom
      video={currentMediaPermissions?.video ?? false}
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
            width: 94,
            height: 94,
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

  if (permissionChecked === false && !isReConnecting)
    content = (
      <CheckPermissions2 onChecked={() => setPermissionChecked(true)} />
    );

  return (
    <RoomHolderContext.Provider
      value={{ changeMediaPermission, mediaPermissions }}
    >
      <ChatWrapper>
        <RoomContext
          room={room}
          room_id={room_id}
          onRoomUpdated={onRoomUpdated}
          workspace_id={workspace_id}
        >
          {content}
        </RoomContext>
      </ChatWrapper>
    </RoomHolderContext.Provider>
  );
}
