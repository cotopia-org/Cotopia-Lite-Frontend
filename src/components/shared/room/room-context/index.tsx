import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import { WorkspaceRoomType } from "@/types/room";
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
  openSidebar: (node: ReactNode) => void;
  updateUserCoords: (
    username: string,
    position: { x: number; y: number }
  ) => void;
  closeSidebar: () => void;
  sidebar?: ReactNode;
}>({
  room: undefined,
  room_id: undefined,
  workspace_id: undefined,
  sidebar: undefined,
  updateUserCoords: (username, position) => {},
  openSidebar: (item) => {},
  closeSidebar: () => {},
});

export const useRoomContext = () => useContext(RoomCtx);

export default function RoomContext({
  children,
  room_id,
  room,
  onRoomUpdated,
  workspace_id,
}: Props) {
  const socket = useSocket();

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
    console.log("xxx", data);
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
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
