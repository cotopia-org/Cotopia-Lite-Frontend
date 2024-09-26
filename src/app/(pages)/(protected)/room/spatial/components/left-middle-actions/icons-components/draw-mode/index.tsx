import { useRoomSpatialContext } from "@/context/room-spatial-context";
import ColorIcon from "./color";
import EraserIcon from "./eraser";
import FontSizeIcon from "./font-size";
import CloseDrawMode from "./close";
import TrashIcon from "./trash";
import ScreenshotButton from "./camera";
import MoveScreen from "./move-screen";

export default function DrawModeIcons() {
  return (
    <>
      <ColorIcon />
      <MoveScreen />
      <FontSizeIcon />
      <EraserIcon />
      <ScreenshotButton />
      <TrashIcon />
      <CloseDrawMode />
    </>
  );
}
