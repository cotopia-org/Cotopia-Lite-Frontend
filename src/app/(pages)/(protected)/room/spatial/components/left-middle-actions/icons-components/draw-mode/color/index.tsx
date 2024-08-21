import { Palette } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "../../../../../room-spatial-wrapper";

export default function ColorIcon() {
  const { setDrawColor } = useRoomSpatialContext();

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
  );
}
