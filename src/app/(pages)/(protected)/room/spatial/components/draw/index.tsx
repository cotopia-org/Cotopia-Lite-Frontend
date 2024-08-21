"use client";

import UseDraw from "@/hooks/use-draw";
import { Draw } from "@/types/draw";
import useWindowSize from "@/hooks/use-window-size";
import { useRoomSpatialContext } from "../../room-spatial-wrapper";

export default function RoomDraw() {
  const { canvasRef, onMouseDown } = UseDraw(drawLine);
  const { drawMode, drawColor, fontSize } = useRoomSpatialContext();
  const { windowSize } = useWindowSize();

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
          width={windowSize.windowWidth}
          height={windowSize.windowHeight}
          id="room-spatial-canvas"
        />
      )}
    </>
  );
}
