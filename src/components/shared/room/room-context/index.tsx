import React, { createContext, ReactNode, useContext, useState } from "react";

type Props = {
  children: ReactNode;
  room_id?: string;
  workspace_id?: string;
};

const RoomCtx = createContext<{
  room_id?: string;
  workspace_id?: string;
  openSidebar: (node: ReactNode) => void;
  closeSidebar: () => void;
  sidebar?: ReactNode;
}>({
  room_id: undefined,
  workspace_id: undefined,
  sidebar: undefined,
  openSidebar: (item) => {},
  closeSidebar: () => {},
});

export const useRoomContext = () => useContext(RoomCtx);

export default function RoomContext({
  children,
  room_id,
  workspace_id,
}: Props) {
  const [sidebar, setSidebar] = useState<ReactNode>();
  const openSidebar = (sidebar: ReactNode) => setSidebar(sidebar);
  const closeSidebar = () => setSidebar(undefined);

  return (
    <RoomCtx.Provider
      value={{
        room_id,
        workspace_id,
        sidebar,
        closeSidebar,
        openSidebar,
      }}
    >
      {children}
    </RoomCtx.Provider>
  );
}
