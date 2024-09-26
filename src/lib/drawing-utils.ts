import { Draw, Line } from "@/types/room-spatial-draw";

export function drawLine(
  { prevPoint, currentPoint, ctx, eraserMode }: Draw,
  canvasOffset: { x: number; y: number },
  zoomLevel: number,
  drawColor: string,
  fontSize: number,
  setLines: React.Dispatch<React.SetStateAction<Line[]>>
) {
  if (!currentPoint || !prevPoint) return;

  const adjustedX1 = (prevPoint.x - canvasOffset.x) / zoomLevel;
  const adjustedY1 = (prevPoint.y - canvasOffset.y) / zoomLevel;
  const adjustedX2 = (currentPoint.x - canvasOffset.x) / zoomLevel;
  const adjustedY2 = (currentPoint.y - canvasOffset.y) / zoomLevel;

  const lineWidth = eraserMode ? 20 : fontSize || 5;

  ctx.globalCompositeOperation = eraserMode ? "destination-out" : "source-over";
  ctx.strokeStyle = eraserMode ? "rgba(0,0,0,1)" : drawColor;
  ctx.lineWidth = lineWidth;

  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(adjustedX1, adjustedY1);
  ctx.lineTo(adjustedX2, adjustedY2);
  ctx.stroke();

  // Save the line to state with its properties (color, width, etc.)
  setLines((prev: Line[]) => [
    ...prev,
    {
      start: { x: adjustedX1, y: adjustedY1 },
      end: { x: adjustedX2, y: adjustedY2 },
      color: drawColor || "black",
      lineWidth,
      eraser: eraserMode,
    },
  ]);
}

export function redrawCanvas(ctx: CanvasRenderingContext2D, lines: Line[]) {
  lines.forEach((line: Line) => {
    const { start, end, color, lineWidth, eraser } = line;

    ctx.globalCompositeOperation = eraser ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  });
}
