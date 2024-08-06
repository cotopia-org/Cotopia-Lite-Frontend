'use client';

import { useRoomSpatialContext } from "@/app/(pages)/(protected)/room/spatial/room-spatial-wrapper";
import { Draw, Point } from "@/types/draw";
import { useEffect, useRef, useState } from "react";

export default function UseDraw(onDraw: ({ ctx, currentPoint, prevPoint, eraserMode }: Draw) => void) {
  const { eraserMode } = useRoomSpatialContext();
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [isInsideCanvas, setIsInsideCanvas] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<Point | null>(null);

  function onMouseDown() {
    if (isInsideCanvas) {
      setMouseDown(true);
    }
  }

  function onMouseUp() {
    setMouseDown(false);
    prevPointRef.current = null;
  }

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const currentPoint = computePointInCanvas(event);

      if (!mouseDown) return;

      const ctx = canvasRef.current?.getContext('2d');

      if (!ctx || !currentPoint) return;
      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current, eraserMode });
      prevPointRef.current = currentPoint;
    };

    const computePointInCanvas = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

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
      canvas.addEventListener('mousemove', handler);
      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handler);
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onDraw, mouseDown, eraserMode]);

  return { canvasRef, onMouseDown, eraserMode };
}