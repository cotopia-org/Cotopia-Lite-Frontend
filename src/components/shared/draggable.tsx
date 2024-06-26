"use client";
import Draggable from "react-draggable";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useScreen } from "@/hooks/use-screen";
import axiosInstance from "@/lib/axios";
import { useRoomContext } from "./room/room-context";

type Props = {
  children: ReactNode;
  onDragEnd?: (position: { x: number; y: number }) => void;
  x?: number;
  y?: number;
  disabled?: boolean;
  hasTransition?: boolean;
};

const DEFAULT_X = 0;
const DEFAULT_Y = 0;

export default function DraggableComponent({
  children,
  onDragEnd,
  x,
  y,
  disabled = false,
  hasTransition = false,
}: Props) {
  const { sidebar } = useRoomContext();

  const divRef = useRef<HTMLDivElement>(null);

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

  const handleUpdateCoordinates = (position: { x: number; y: number }) => {
    axiosInstance.post(`/users/updateCoordinates`, {
      coordinates: `${position.x},${position.y}`,
    });
  };

  const [diffX, setDiffX] = useState(0);
  const [diffY, setDiffY] = useState(0);

  const handleDragStart = (dragEvent: any) => {
    if (!divRef.current) return;

    const startX = dragEvent.clientX;
    const startY = dragEvent.clientY;

    const rect = divRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setDiffX(startX - x);
    setDiffY(startY - y);
  };

  const hanldeDragEnd = (dragEvent: any) => {
    let x = dragEvent?.x;
    let y = dragEvent?.y;

    const finalDiffX = Math.abs(diffX);
    const finalDiffY = Math.abs(diffY);

    x = diffX > 0 ? x - finalDiffX : x + finalDiffX;
    y = diffY > 0 ? y - finalDiffY : y + finalDiffY;

    if (sidebar) {
      x = x + 188;
    }

    y = y + 48;
    const newPosition = {
      x,
      y,
    };

    setDiffX(0);
    setDiffY(0);

    setPosition(newPosition);

    handleUpdateCoordinates(newPosition);

    if (onDragEnd) onDragEnd(newPosition);
  };

  const { height, width } = useScreen();

  let defaultClassName = "";

  if (hasTransition) defaultClassName += ` transition-all`;

  return (
    <Draggable
      positionOffset={{
        x: (-1 * width) / 2,
        y: (-1 * height) / 2,
      }}
      position={position}
      onStop={hanldeDragEnd}
      onStart={handleDragStart}
      disabled={disabled}
      bounds={{
        top: 0,
        left: 0,
        right: width,
        bottom: height,
      }}
      defaultClassName={defaultClassName}
    >
      <div ref={divRef}>{children}</div>
    </Draggable>
  );
}
