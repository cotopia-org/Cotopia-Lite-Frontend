import { Eraser } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "../../../../../room-spatial-wrapper";

export default function EraserIcon() {
  const { setEraserMode , eraserMode , setDrawColor , drawColor} = useRoomSpatialContext();

  function handlerEraser() {
    if(eraserMode) {
      setEraserMode(prevState => false)
      setDrawColor(drawColor)
    } else {
      setEraserMode(prevState => true)
    }
  }

  return (
    <RoomIcon
      icon={<Eraser onClick={handlerEraser} />}
    />
  );
}
