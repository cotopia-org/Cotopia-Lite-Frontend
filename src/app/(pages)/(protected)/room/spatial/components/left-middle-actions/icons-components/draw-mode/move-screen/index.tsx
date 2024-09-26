"use client";

import React from "react";
import { Hand, Brush } from "lucide-react";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
import RoomIcon from "../../../room-icon";

export default function MoveScreen() {
  const { setMoveScreen, moveScreen } = useRoomSpatialContext();

  const toggleDrawMode = () => {
    setMoveScreen((prevState) => !prevState);
  };

  return (
    <div className="flex items-center space-x-4">
      <RoomIcon
        icon={
          moveScreen ? (
            <Brush className="w-6 h-6" onClick={toggleDrawMode} />
          ) : (
            <Hand className="w-6 h-6" onClick={toggleDrawMode} />
          )
        }
        hover={true}
      />
    </div>
  );
}
