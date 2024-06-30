"use client";

import { ReactNode, useContext, useState, createContext, Dispatch, SetStateAction } from "react";

// Define the type for the context
interface RoomSpatialContextType {
  drawColor: string;
  setDrawColor: Dispatch<SetStateAction<string>>;
  drawMode: boolean;
  setDrawMode: Dispatch<SetStateAction<boolean>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
}

// Initialize context with default values
const RoomSpatialContext = createContext<RoomSpatialContextType | undefined>(undefined);

interface RoomSpatialWrapperProps {
  children: ReactNode;
}

export function RoomSpatialWrapper({ children }: RoomSpatialWrapperProps) {
  const [drawColor, setDrawColor] = useState<string>("");
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(5);

  return (
    <RoomSpatialContext.Provider value={{ drawColor, setDrawColor, drawMode, setDrawMode, fontSize, setFontSize }}>
      {children}
    </RoomSpatialContext.Provider>
  );
}

export function useRoomSpatialContext() {
  const context = useContext(RoomSpatialContext);

  if (context === undefined) {
    throw new Error("useRoomSpatialContext must be used within a RoomSpatialWrapper");
  }

  return context;
}