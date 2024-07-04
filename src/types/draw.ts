export type Point = { x: number, y: number };

export type Draw = {
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  prevPoint: Point | null,
  eraserMode: boolean,
};
