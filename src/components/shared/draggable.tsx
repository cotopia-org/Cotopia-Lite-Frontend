"use client";
import Draggable, {
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  onDragEnd?: (position: { x: number; y: number }) => void;
  x?: number;
  y?: number;
  disabled?: boolean;
};

const DEFAULT_X = 0;
const DEFAULT_Y = 0;

export default function DraggableComponent({
  children,
  onDragEnd,
  x,
  y,
  disabled = false,
}: Props) {
  const hanldeDragEnd = (dragEvent: any) => {
    console.log("dragEvent", dragEvent);
    if (onDragEnd)
      onDragEnd({
        x: dragEvent.x,
        y: dragEvent.y,
      });
  };

  return (
    <Draggable
      positionOffset={{
        x: (-1 * window.screen.width) / 2,
        y: (-1 * window.screen.height) / 2,
      }}
      defaultPosition={{ x: x ?? DEFAULT_X, y: y ?? DEFAULT_Y }}
      onStop={hanldeDragEnd}
      disabled={disabled}
    >
      <div>{children}</div>
    </Draggable>
  );
}
