"use client";

import { ReactNode, useContext, useState, createContext, Dispatch, SetStateAction } from "react";

<<<<<<< HEAD
=======
// Define the type for the context
>>>>>>> b5ed8600d5a8698bb20cd9e9327f7cf4efc5140d
interface RoomSpatialContextType {
  drawColor: string;
  setDrawColor: Dispatch<SetStateAction<string>>;
  drawMode: boolean;
  setDrawMode: Dispatch<SetStateAction<boolean>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
<<<<<<< HEAD
  eraserMode: boolean;
  setEraserMode: Dispatch<SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  clear: () => void;
}

=======
}

// Initialize context with default values
>>>>>>> b5ed8600d5a8698bb20cd9e9327f7cf4efc5140d
const RoomSpatialContext = createContext<RoomSpatialContextType | undefined>(undefined);

interface RoomSpatialWrapperProps {
  children: ReactNode;
}

export function RoomSpatialWrapper({ children }: RoomSpatialWrapperProps) {
  const [drawColor, setDrawColor] = useState<string>("");
  const [drawMode, setDrawMode] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(5);
<<<<<<< HEAD
  const [eraserMode, setEraserMode] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  // Remove Canvas Draw
  function clear() {
    const canvas = document.getElementById('room-spatial-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <RoomSpatialContext.Provider value={{ drawColor, setDrawColor, drawMode, setDrawMode, fontSize, setFontSize, setEraserMode, eraserMode, clear , openSidebar , setOpenSidebar}}>
=======

  return (
    <RoomSpatialContext.Provider value={{ drawColor, setDrawColor, drawMode, setDrawMode, fontSize, setFontSize }}>
>>>>>>> b5ed8600d5a8698bb20cd9e9327f7cf4efc5140d
      {children}
    </RoomSpatialContext.Provider>
  );
}

<<<<<<< HEAD
export function useRoomSpatialDrawContext() {
=======
export function useRoomSpatialContext() {
>>>>>>> b5ed8600d5a8698bb20cd9e9327f7cf4efc5140d
  const context = useContext(RoomSpatialContext);

  if (context === undefined) {
    throw new Error("useRoomSpatialContext must be used within a RoomSpatialWrapper");
  }
<<<<<<< HEAD
  return context;
}
=======

  return context;
}

>>>>>>> b5ed8600d5a8698bb20cd9e9327f7cf4efc5140d
