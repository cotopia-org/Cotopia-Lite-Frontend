"use client";

import {
  ALargeSmall,
  CircleX,
  Eraser,
  Palette,
  Trash,
  MapPin,
  Images,
  SlidersHorizontal,
} from "lucide-react";

import RoomIcon from "./room-icon";
import { useRoomSpatialContext } from "../../room-spatial-wrapper";
export default function LeftMiddleActions() {
  const {
    drawMode,
    setDrawColor,
    setFontSize,
    setDrawMode,
    setEraserMode,
    clear,
  } = useRoomSpatialContext();
  const colors = [
    "#5D11FF",
    "#8D48CF",
    "#FFE44D",
    "#F9A000",
    "#18C77E",
    "#FB6A8D",
    "#82E1FF",
    "#2A96FC",
  ];
  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col items-center gap-y-5 bg-white p-4 rounded-sm">
     
      <div className="bg-white flex flex-col gap-3 rounded-md text-black">
        {drawMode ? (
          <>
            <RoomIcon icon={<Palette />}>
              {colors.map((color) => (
                <span
                  key={color}
                  className="w-6 h-6 rounded-sm border"
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => setDrawColor(color)}
                ></span>
              ))}
            </RoomIcon>

            <RoomIcon icon={<ALargeSmall />}>
              <select
                name="select-font-size"
                id="font-size"
                className="p-2 rounded-sm"
                onChange={(event) => setFontSize(+event.target.value)}
              >
                <option value="5">5 Px</option>
                <option value="10">10 Px</option>
                <option value="15">15 Px</option>
                <option value="20">20 Px</option>
              </select>
            </RoomIcon>

            <RoomIcon
              icon={
                <Eraser
                  onClick={() => setEraserMode((prevState) => !prevState)}
                />
              }
            />

            <RoomIcon icon={<Trash color="red" onClick={clear} />} />
            
            <RoomIcon
              icon={
                <CircleX
                  color="red"
                  onClick={() => setDrawMode((prevState) => !prevState)}
                />
              }
            />

          </>

        ) : (
          <>
            <RoomIcon icon={<MapPin />} />
            <RoomIcon icon={<Images />} />
            <RoomIcon icon={<SlidersHorizontal />} />
          </>
        )}
      </div>
      
    </div>
  );
}
