'use client';

import UseDraw from "@/hooks/use-draw";
import { Draw } from "@/types/draw";
import { Button } from "@/components/ui/button";
import { useRoomSpatialContext } from "../../room-spatial-wrapper";

export default function RoomDraw() {
  const { canvasRef, onMouseDown, clear, toggleEraser, eraserMode } = UseDraw(drawLine);
  const { drawColor, drawMode, setDrawMode, fontSize } = useRoomSpatialContext();

  // Function to handle drawing on the canvas
  function drawLine({ prevPoint, currentPoint, ctx, eraserMode }: Draw) {
    const { x: currentX, y: currentY } = currentPoint;
    const color = eraserMode ? '#020617' : drawColor;
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
        <div className="w-full h-4/5 bg-slate-950 flex flex-col justify-center items-center p-2 my-4">
          <div className="mb-2">
            {/* Button to switch drawing mode */}
            <Button onClick={() => setDrawMode(false)} className="mr-2 px-4 py-2 text-white">Switch Draw Mode</Button>

            {/* Button to toggle between drawing and erasing */}
            <Button onClick={toggleEraser} className="mr-2 px-4 py-2 text-white">
              {eraserMode ? 'Switch to Draw' : 'Switch to Erase'}
            </Button>

            {/* Button to clear the canvas */}
            <Button onClick={clear} className="px-4 py-2 bg-red-500 text-white">Clear</Button>
          </div>

          {/* Canvas for drawing */}
          <canvas onMouseDown={onMouseDown} ref={canvasRef} width={1100} height={450} className="col-span-6 border" />
        </div>
      )}
    </>
  );
}
