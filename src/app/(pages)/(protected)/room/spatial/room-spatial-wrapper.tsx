"use client";

import { RoomSpatialContextType } from "@/types/room-spatial-context";
import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
} from "react";

const RoomSpatialContext = createContext<RoomSpatialContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export default function RoomSpatialWrapper({ children }: Props) {
  const [drawColor, setDrawColor] = useState<string>("");
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(5);
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  function clear() {
    const canvas = document.getElementById(
      "room-spatial-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  return (
    <RoomSpatialContext.Provider
      value={{
        drawColor,
        setDrawColor,
        drawMode,
        setDrawMode,
        fontSize,
        setFontSize,
        clear,
        eraserMode,
        openSidebar,
        setEraserMode,
        setOpenSidebar,
      }}
    >
      {children}
    </RoomSpatialContext.Provider>
  );
}

export function useRoomSpatialContext() {
  const context = useContext(RoomSpatialContext);

  if (context === undefined) {
    throw new Error(
      "useRoomSpatialContext must be used within a RoomSpatialWrapper"
    );
  }
  return context;
}
