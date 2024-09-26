// Define the Point type for start and end points
export interface Point {
  x: number;
  y: number;
}

// Define the type for lines drawn on the canvas
export interface Line {
  start: Point;
  end: Point;
  color: string;
  lineWidth: number;
  eraser: boolean;
}

// Type for drawing actions
export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
  eraserMode: boolean;
};
