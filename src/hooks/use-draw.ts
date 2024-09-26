"use client";

import { useRoomSpatialContext } from "@/context/room-spatial-context";
import { Draw, Point } from "@/types/room-spatial-draw";
import { useEffect, useRef, useState } from "react";

export default function UseDraw(
  onDraw: ({ ctx, currentPoint, prevPoint, eraserMode }: Draw) => void
) {
  const { eraserMode } = useRoomSpatialContext();
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isInsideCanvas, setIsInsideCanvas] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<Point | null>(null);
  let animationFrameId: number;

  function onMouseDown() {
    if (isInsideCanvas) {
      setMouseDown(true);
    }
  }

  function onMouseUp() {
    setMouseDown(false);
    prevPointRef.current = null;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!mouseDown) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const currentPoint = computePointInCanvas(event);
        if (!currentPoint) return;

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        if (prevPointRef.current) {
          drawSmoothLine(
            ctx,
            prevPointRef.current,
            currentPoint,
            eraserMode,
            onDraw
          );
        }

        prevPointRef.current = currentPoint;
      });
    };

    const computePointInCanvas = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      return { x, y };
    };

    const handleMouseEnter = () => setIsInsideCanvas(true);
    const handleMouseLeave = () => {
      setIsInsideCanvas(false);
      setMouseDown(false);
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handler);
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseenter", handleMouseEnter);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handler);
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onDraw, mouseDown, eraserMode]);

  return { canvasRef, onMouseDown, eraserMode };
}

const drawSmoothLine = (
  ctx: CanvasRenderingContext2D,
  startPoint: Point,
  endPoint: Point,
  eraserMode: boolean,
  onDraw: ({ ctx, currentPoint, prevPoint, eraserMode }: Draw) => void 
) => {
  const distance = Math.hypot(
    endPoint.x - startPoint.x,
    endPoint.y - startPoint.y
  );
  const steps = Math.ceil(distance / 4);

  for (let i = 1; i <= steps; i++) {
    const x = startPoint.x + ((endPoint.x - startPoint.x) / steps) * i;
    const y = startPoint.y + ((endPoint.y - startPoint.y) / steps) * i;

    onDraw({ ctx, currentPoint: { x, y }, prevPoint: startPoint, eraserMode });
  }
};