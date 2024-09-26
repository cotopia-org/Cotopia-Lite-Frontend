import { useState } from "react";
import { ReactFlow, ReactFlowProvider, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import RoomDraw from "../draw";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

interface Offset {
  x: number;
  y: number;
}

export default function CanvasWithFlow() {
  const { moveScreen, drawMode } = useRoomSpatialContext();
  const [canvasOffset, setCanvasOffset] = useState<Offset>({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePaneScroll = (event: any, viewport: any) => {
    setCanvasOffset({
      x: viewport.x,
      y: viewport.y,
    });
    setZoomLevel(viewport.zoom);
  };

  const canPanScreen = (moveScreen && drawMode) || (!moveScreen && !drawMode);

  return (
    <>
      <RoomDraw
        canvasOffset={canvasOffset}
        moveScreen={moveScreen}
        zoomLevel={zoomLevel}
      />

      <div
        className={`absolute inset-0 z-${
          canPanScreen ? "30" : "10"
        } pointer-events-${canPanScreen ? "auto" : "none"}`}
      >
        <ReactFlowProvider>
          <ReactFlow
            panOnDrag={canPanScreen}
            onMove={handlePaneScroll}
            style={{ pointerEvents: canPanScreen ? "auto" : "none" }}
          >
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
}
