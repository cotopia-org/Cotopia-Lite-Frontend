import { createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
  room_id?: string;
  workspace_id?: string;
};

const RoomCtx = createContext<{
  room_id?: string;
  workspace_id?: string;
}>({
  room_id: undefined,
  workspace_id: undefined,
});

export const useRoomContext = () => useContext(RoomCtx);

export default function RoomContext({
  children,
  room_id,
  workspace_id,
}: Props) {
  return (
    <RoomCtx.Provider
      value={{
        room_id,
        workspace_id,
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
