import { Dispatch, SetStateAction } from "react";

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
  clear: () => void;
}