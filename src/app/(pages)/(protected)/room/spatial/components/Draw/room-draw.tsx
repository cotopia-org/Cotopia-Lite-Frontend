'use client';

import UseDraw from "@/hooks/use-draw";
import { Draw } from "@/types/draw";
import { useEffect, useState } from "react";
import { useRoomSpatialDrawContext } from "../../room-spatial-wrapper";

export default function RoomDraw() {
  const { canvasRef, onMouseDown } = UseDraw(drawLine);
  const { drawMode, drawColor, fontSize } = useRoomSpatialDrawContext();
  const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: window.innerWidth, height: window.innerHeight })
  const pageContent = document.getElementById("room-spatial-content") as HTMLDivElement;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: pageContent.offsetWidth, height: pageContent.offsetHeight })
      console.log(pageContent.offsetWidth)
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function drawLine({ prevPoint, currentPoint, ctx, eraserMode }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const color = eraserMode ? "#191b29" : drawColor;
    const lineWidth = eraserMode ? 20 : fontSize ? fontSize : 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    if (!eraserMode) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  return (
    <>
      {drawMode && (
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={windowSize.width}
          height={windowSize.height}
          id="room-spatial-canvas"
        />
      )}
    </>
  );
}
