import { Dispatch, SetStateAction } from "react";

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  start: Point;
  end: Point;
  color: string;
  lineWidth: number;
  eraser: boolean;
}

export interface RoomSpatialContextType {
  drawColor: string;
  setDrawColor: Dispatch<SetStateAction<string>>;
  drawMode: boolean;
  setDrawMode: Dispatch<SetStateAction<boolean>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  eraserMode: boolean;
  setEraserMode: Dispatch<SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  moveScreen: boolean;
  setMoveScreen: Dispatch<SetStateAction<boolean>>;
  clear: () => void;
  lines: Line[];
  setLines: Dispatch<SetStateAction<Line[]>>;
}
