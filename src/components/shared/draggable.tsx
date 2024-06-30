"use client";
import Draggable from "react-draggable";
import { ReactNode, useEffect, useState } from "react";
import { useScreen } from "@/hooks/use-screen";

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
    const x = dragEvent?.x;
    const y = dragEvent?.y;

    const newPosition = {
      x,
      y: y,
    };

    setPosition(newPosition);

    if (onDragEnd) onDragEnd(newPosition);
  };

  const { height, width } = useScreen();

  return (
    <Draggable
      positionOffset={{
        x: (-1 * width) / 2,
        y: (-1 * height) / 2,
      }}
      position={position}
      onStop={hanldeDragEnd}
      disabled={disabled}
    >
      <div>{children}</div>
    </Draggable>
  );
}
