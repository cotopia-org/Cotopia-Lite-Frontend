"use client";

import ColorIcon from "./color";
import EraserIcon from "./eraser";
import FontSizeIcon from "./font-size";
import CloseDrawMode from "./close";
import TrashIcon from "./trash";

export default function DrawModeIcons() {
  return (
    <>
      <ColorIcon />
      <FontSizeIcon />
      <EraserIcon />
      <TrashIcon/>
      <CloseDrawMode />
    </>
  );
}
