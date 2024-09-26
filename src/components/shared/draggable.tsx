"use client";
import Draggable from "react-draggable";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRoomContext } from "./room/room-context";

export type DraggableProps = {
  children: ReactNode;
  onDragging?: (position: { x: number; y: number }) => void;
  onStartDragging?: () => void;
  onDragEnd?: (position: { x: number; y: number }) => void;
  x?: number;
  y?: number;
  disabled?: boolean;
  hasTransition?: boolean;
  positionOffset?: {
    x: number;
    y: number;
  };
  bounds?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
};

const DEFAULT_X = 0;
const DEFAULT_Y = 0;

export default function DraggableComponent({
  children,
  onDragEnd,
  onStartDragging,
  onDragging,
  x,
  y,
  disabled = false,
  hasTransition = false,
  positionOffset,
  bounds,
}: DraggableProps) {
  const { sidebar } = useRoomContext();

  const divRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: x ?? DEFAULT_X,
    y: y ?? DEFAULT_Y,
  });

  useEffect(() => {
    if (position.x === 0 && position.y === 0)
      setPosition({
        x: x ?? DEFAULT_X,
        y: y ?? DEFAULT_Y,
      });
  }, [x, y, position]);

  useEffect(() => {
    if (x !== undefined && y !== undefined) {
      setPosition({ x, y });
    }
  }, [x, y]);

  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);

  const handleDragging = (dragEvent: any) => {
    let x = dragEvent?.x;
    let y = dragEvent?.y;

    const finalDiffX = Math.abs(diffX);
    const finalDiffY = Math.abs(diffY);

    x = diffX > 0 ? x - finalDiffX : x + finalDiffX;
    y = diffY > 0 ? y - finalDiffY : y + finalDiffY;

    // if (y < (bounds?.top ?? 0)) y = bounds?.top ?? 0;
    // if (x < (bounds?.left ?? 0)) x = bounds?.left ?? 0;

    // if (sidebar) {
    //   x = x + 188;
    // }

    const newPosition = {
      x,
      y,
    };

    setPosition(newPosition);

    if (onDragging) onDragging(newPosition);
  };

  const handleDragStart = (dragEvent: any) => {
    if (!divRef.current) return;

    const startX = dragEvent.clientX;
    const startY = dragEvent.clientY;

    const rect = divRef.current.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    setDiffX(startX - x);
    setDiffY(startY - y);

    if (onStartDragging) onStartDragging();
  };

  const hanldeDragEnd = (dragEvent: any) => {
    let x = dragEvent?.x;
    let y = dragEvent?.y;

    const finalDiffX = Math.abs(diffX);
    const finalDiffY = Math.abs(diffY);

    x = diffX > 0 ? x - finalDiffX : x + finalDiffX;
    y = diffY > 0 ? y - finalDiffY : y + finalDiffY;

    // if (y < (bounds?.top ?? 0)) y = bounds?.top ?? 0;
    // if (x < (bounds?.left ?? 0)) x = bounds?.left ?? 0;

    // if (sidebar) {
    //   x = x + 188;
    // }

    const newPosition = {
      x,
      y,
    };

    setDiffX(0);
    setDiffY(0);

    setPosition(newPosition);

    if (onDragEnd) onDragEnd(newPosition);
  };

  let defaultClassName = "absolute";

  if (hasTransition) defaultClassName += ` transition-all`;

  return (
    <Draggable
      positionOffset={positionOffset}
      position={position}
      onStop={hanldeDragEnd}
      onStart={handleDragStart}
      onDrag={handleDragging}
      disabled={disabled}
      bounds={bounds}
      defaultClassName={defaultClassName}
    >
      <div ref={divRef}>{children}</div>
    </Draggable>
  );
}
