"use client";
import Draggable, {
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";
import { ReactNode, useEffect, useState } from "react";

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
  const [position, setPosition] = useState({
    x: x ?? DEFAULT_X,
    y: y ?? DEFAULT_Y,
  });

  useEffect(() => {
    setPosition({
      x: x ?? DEFAULT_X,
      y: y ?? DEFAULT_Y,
    });
  }, [x, y]);

  const hanldeDragEnd = (dragEvent: any) => {
    const x = dragEvent?.x + 0;
    const y = dragEvent?.y + 140;

    const newPosition = {
      x,
      y,
    };

    setPosition(newPosition);

    if (onDragEnd) onDragEnd(newPosition);
  };

  return (
    <Draggable
      positionOffset={{
        x: (-1 * window.screen.width) / 2,
        y: (-1 * window.screen.height) / 2,
      }}
      position={position}
      onStop={hanldeDragEnd}
      disabled={disabled}
    >
      <div>{children}</div>
    </Draggable>
  );
}
