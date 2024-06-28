"use client";

import { ReactNode, useContext, useState, createContext } from "react";

const RoomSpatialContext = createContext({ drawColor: "", setDrawColor: (color: string) => { } , drawMode : false, setDrawMode: (state: boolean) => {} });

interface RoomSpatialWrapperProps {
  children: ReactNode;
}

export function RoomSpatialWrapper({ children }: RoomSpatialWrapperProps) {
  const [drawColor, setDrawColor] = useState<string>("");
  const [drawMode, setDrawMode] = useState<boolean>(false);

  return (
    <RoomSpatialContext.Provider value={{ drawColor, setDrawColor , drawMode , setDrawMode}}>
      {children}
    </RoomSpatialContext.Provider>
  );
}

export function useRoomSpatialContext() {
  const context = useContext(RoomSpatialContext);

  if (!context) {
    throw new Error("useRoomSpatialContext must be used within a RoomSpatialWrapper");
  }

  return context;
}
