"use client";

import DrawModeIcons from "./icons-components/draw-mode";
import BasicModeIcons from "./icons-components/basic-mode";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function LeftMiddleActions() {
  const { drawMode } = useRoomSpatialContext();

  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center gap-y-5 bg-white p-4 rounded-sm z-40 shadow-lg">
      <div className="bg-white flex flex-col items-center gap-3 rounded-md text-black">
        {drawMode ? <DrawModeIcons /> : <BasicModeIcons />}
      </div>
    </div>
  );
}
