import { ALargeSmall } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function FontSizeIcon() {
  const { setFontSize } = useRoomSpatialContext();

  return (
    <RoomIcon icon={<ALargeSmall />} hover={true}>
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
        <option value="30">25 Px</option>
      </select>
    </RoomIcon>
  );
}
