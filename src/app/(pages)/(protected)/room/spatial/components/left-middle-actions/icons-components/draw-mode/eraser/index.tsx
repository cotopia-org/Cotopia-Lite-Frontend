import { Eraser } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "../../../../../room-spatial-wrapper";

export default function EraserIcon() {
  const { setEraserMode } = useRoomSpatialContext();

  return (
    <RoomIcon
      icon={<Eraser onClick={() => setEraserMode((prevState) => !prevState)} />}
    />
  );
}
