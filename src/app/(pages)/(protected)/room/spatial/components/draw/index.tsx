"use client";

import { useEffect, RefObject } from "react";
import UseDraw from "@/hooks/use-draw";
import useWindowSize from "@/hooks/use-window-size";
import { Draw } from "@/types/room-spatial-draw";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
import { drawLine, redrawCanvas } from "@/lib/drawing-utils";

interface RoomDrawProps {
  canvasOffset: { x: number; y: number };
  moveScreen: boolean;
  zoomLevel: number;
}

export default function RoomDraw({
  canvasOffset,
  moveScreen,
  zoomLevel,
}: RoomDrawProps) {
  const { canvasRef, onMouseDown } = UseDraw((drawData: Draw) =>
    drawLine(drawData, canvasOffset, zoomLevel, drawColor, fontSize, setLines)
  );

  const { drawMode, drawColor, fontSize, lines, setLines } =
    useRoomSpatialContext();
  const { windowSize } = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = windowSize.windowWidth;
      canvas.height = windowSize.windowHeight;
      redrawCanvas(ctx, lines); 
    };

    updateCanvasSize(); 
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [canvasRef, windowSize, lines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvasOffset.x, canvasOffset.y);
    ctx.scale(zoomLevel, zoomLevel);
    redrawCanvas(ctx, lines); 
    ctx.restore();
  }, [canvasOffset, zoomLevel, lines]);

  return (
    <>
      {drawMode && (
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef as RefObject<HTMLCanvasElement>}
          width={windowSize.windowWidth}
          height={windowSize.windowHeight}
          id="room-spatial-canvas"
          className={`absolute inset-0 z-30 w-screen h-screen pointer-events-${
            moveScreen ? "none" : "auto"
          }`}
        />
      )}
    </>
  );
}
