import { createContext, ReactNode, useContext } from "react";

type Props = {
  room_id: string;
  workspace_id: string;
  children: ReactNode;
};

const CotopiaRoomContext = createContext<{
  room_id?: string;
  workspace_id?: string;
}>({
  room_id: undefined,
  workspace_id: undefined,
});

export const useCotopiaRoom = () => useContext(CotopiaRoomContext);

export default function CotopiaRoom({
  room_id,
  workspace_id,
  children,
}: Props) {
  return (
    <CotopiaRoomContext.Provider
      value={{
        room_id,
        workspace_id,
      }}
    >
      {children}
    </CotopiaRoomContext.Provider>
  );
}
