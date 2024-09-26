import { CircleX } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function CloseDrawMode() {
  const { setDrawMode } = useRoomSpatialContext();

  return (
    <RoomIcon
      icon={
        <CircleX
          color="red"
          onClick={() => setDrawMode(false)}
        />
      }
    />
  );
}
