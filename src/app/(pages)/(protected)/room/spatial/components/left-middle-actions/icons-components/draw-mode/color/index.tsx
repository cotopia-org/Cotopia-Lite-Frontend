import { Palette } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
import { useRef } from "react";

export default function ColorIcon() {
  const { setDrawColor } = useRoomSpatialContext();
  const customColor = useRef<HTMLInputElement>(null);

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

  function handleCustomColor() {
    if(customColor.current?.value) {
      setDrawColor(customColor.current.value)
    }
  }

  return (
    <RoomIcon icon={<Palette />} hover={true}>
      {colors.map((color) => (
        <span
          key={color}
          className="w-6 h-6 rounded-sm border"
          style={{ backgroundColor: `${color}` }}
          onClick={() => setDrawColor(color)}
        ></span>
      ))}
      <div className="flex items-center justify-center gap-x-2 px-2 border-l">
        <input ref={customColor} type="color" className="w-6 h-6 rounded-sm border cursor-pointer"/>
        <button className="text-base font-medium" onClick={handleCustomColor}>Set</button>
      </div>
    </RoomIcon>
  );
}
