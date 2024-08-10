import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import useQueryParams from "@/hooks/use-query-params";
import { WorkspaceRoomType } from "@/types/room";
import { useParams } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  room_id?: string;
  room?: WorkspaceRoomType;
  onRoomUpdated?: (item: WorkspaceRoomType) => void;
  workspace_id?: string;
};

const RoomCtx = createContext<{
  room?: WorkspaceRoomType;
  room_id?: string;
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
}>({
  room: undefined,
  livekit_token: undefined,
  room_id: undefined,
  workspace_id: undefined,
  sidebar: undefined,
  updateUserCoords: (username, position) => {},
  openSidebar: (item) => {},
  closeSidebar: () => {},
  audioState: false,
  videoState: false,
  changePermissionState: (key, newValue) => {},
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

  const [permissionState, setPermissionState] = useState({
    audio: true,
    video: true,
  });

  const changePermissionState = (key: "video" | "audio", newValue: boolean) => {
    setPermissionState((prev) => ({ ...prev, [key]: newValue }));
  };

  const [localRoom, setLocalRoom] = useState(room);
  useEffect(() => {
    if (room !== undefined) setLocalRoom(room);
  }, [room]);

  const updateUserCoords = (
    username: string,
    position: { x: number; y: number }
  ) => {
    if (!localRoom) return;

    setLocalRoom((prev) => {
      const updatedPartValues = {
        participants: localRoom.participants.map((x) => {
          if (x.username === username) {
            x.coordinates = `${position.x},${position.y}`;
          }

          return x;
        }),
      };

      return prev
        ? {
            ...prev,
            ...updatedPartValues,
          }
        : {
            ...localRoom,
            ...updatedPartValues,
          };
    });
  };

  useSocket("roomUpdated", (data) => {
    setLocalRoom(data);
    if (onRoomUpdated) onRoomUpdated(data);
  });

  useSocket("updateCoordinates", (data) => {
    const username = data?.username;
    const coordinates = data?.coordinates;

    if (!username) {
      return;
    }

    if (!coordinates) {
      return;
    }

    setLocalRoom((prev) => {
      const prevParticipants = prev?.participants ?? [];

      const findIndexParticipant = prevParticipants.findIndex(
        (x) => x.username === username
      );

      if (findIndexParticipant > -1) {
        prevParticipants[findIndexParticipant] = {
          ...prevParticipants[findIndexParticipant],
          coordinates,
        };
      }

      return {
        ...((prev ?? {}) as WorkspaceRoomType),
        participants: prevParticipants,
      };
    });
  });

  const [sidebar, setSidebar] = useState<ReactNode>();
  const openSidebar = (sidebar: ReactNode) => setSidebar(sidebar);
  const closeSidebar = () => setSidebar(undefined);

  return (
    <RoomCtx.Provider
      value={{
        room: localRoom,
        room_id,
        workspace_id,
        sidebar,
        closeSidebar,
        openSidebar,
        updateUserCoords,
        audioState: permissionState.audio,
        videoState: permissionState.video,
        changePermissionState,
        livekit_token: (livekit_token as string) ?? undefined,
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
