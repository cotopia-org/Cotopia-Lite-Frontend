import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import { useApi } from "@/hooks/swr";
import useQueryParams from "@/hooks/use-query-params";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { playSoundEffect } from "@/lib/sound-effects";
import { LeaderboardType } from "@/types/leaderboard";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import { UserMinimalType } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
  room_id: number;
  room?: WorkspaceRoomType;
  onRoomUpdated?: (item: WorkspaceRoomType) => void;
  workspace_id?: string;
};

const RoomCtx = createContext<{
  room?: WorkspaceRoomType;
  room_id: number;
  workspace_id?: string;
  livekit_token?: string;
  openSidebar: (node: ReactNode) => void;
  updateUserCoords: (
    username: string,
    position: { x: number; y: number }
  ) => void;
  closeSidebar: () => void;
  sidebar?: ReactNode;
  videoState: boolean;
  audioState: boolean;
  changePermissionState: (key: "video" | "audio", newValue: boolean) => void;
  joinRoom: () => void;
}>({
  room: undefined,
  livekit_token: undefined,
  room_id: 1,
  workspace_id: undefined,
  sidebar: undefined,
  updateUserCoords: (username, position) => {},
  openSidebar: (item) => {},
  closeSidebar: () => {},
  audioState: false,
  videoState: false,
  changePermissionState: (key, newValue) => {},
  joinRoom: () => {},
});

export const useRoomContext = () => useContext(RoomCtx);

export default function RoomContext({
  children,
  room_id,
  room,
  onRoomUpdated,
  workspace_id,
}: Props) {
  const { query } = useQueryParams();
  const livekit_token = query?.token ?? undefined;

  const socket = useSocket();

  const router = useRouter();

  const handleJoinRoom = async () => {
    const res = await axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
      `/rooms/${room_id}/join`
    );

    //Join user to the room by socket request
    if (socket) socket.emit("joinedRoom", room_id);

    const livekitToken = res.data.data.token; //Getting livekit token from joinObject

    playSoundEffect("joined");

    if (livekitToken) {
      router.push(
        `/workspaces/${workspace_id}/rooms/${room_id}?token=${livekitToken}`
      );
      return;
    }
  };

  const [permissionState, setPermissionState] = useState({
    audio: true,
    video: true,
  });

  const changePermissionState = (key: "video" | "audio", newValue: boolean) => {
    setPermissionState((prev) => ({ ...prev, [key]: newValue }));
  };

  const updateUserCoords = (
    username: string,
    position: { x: number; y: number }
  ) => {
    if (room === undefined) return;

    console.log("username", username);
    console.log("position", position);

    setLocalRoom((prev) => {
      const participants = prev?.participants ?? [];

      const participant_index = participants.findIndex(
        (x) => x.username === username
      );

      if (participant_index === -1) return prev;

      participants[participant_index] = {
        ...participants[participant_index],
        coordinates: `${position.x},${position.y}`,
      };

      console.log("participants", participants);

      return {
        ...prev,
        participants,
      } as WorkspaceRoomType;
    });
  };

  useSocket(
    "updateCoordinates",
    (data) => {
      const position = data?.coordinates?.split(",");

  const [sidebar, setSidebar] = useState<ReactNode>();
  const openSidebar = (sidebar: ReactNode) => setSidebar(sidebar);
  const closeSidebar = () => setSidebar(undefined);

  return (
    <RoomCtx.Provider
      value={{
        room,
        room_id: +room_id,
        workspace_id,
        sidebar,
        closeSidebar,
        openSidebar,
        updateUserCoords,
        audioState: permissionState.audio,
        videoState: permissionState.video,
        changePermissionState,
        livekit_token: (livekit_token as string) ?? undefined,
        joinRoom: handleJoinRoom,
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
