import { Eraser } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function EraserIcon() {
  const { setEraserMode , eraserMode , setDrawColor , drawColor} = useRoomSpatialContext();

  function handlerEraser() {
    if(eraserMode) {
      setEraserMode(false)
      setDrawColor(drawColor)
    } else {
      setEraserMode(true)
    }
  }

  return (
    <RoomIcon
      icon={<Eraser onClick={handlerEraser} />}
      hover={true}
    />
  );
}
