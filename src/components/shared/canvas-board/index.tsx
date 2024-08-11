import React, { useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageType } from "konva/lib/Stage";
import useImage from "use-image";
import { useRoomContext } from "../room/room-context";

const CanvasBoard: React.FC = () => {
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage() as StageType;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // Reverse the scaling logic
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
    setStageScale(newScale < 0.7 ? 0.7 : newScale);
    setStagePosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  const { room } = useRoomContext();

  const [image] = useImage(
    room?.background?.url ?? `/assets/backgrounds/bg-sample.webp`
  );

  return (
    <Stage
      // width={window.innerWidth}
      // height={window.innerHeight}
      draggable
      scaleX={stageScale}
      scaleY={stageScale}
      x={stagePosition.x}
      y={stagePosition.y}
      onWheel={handleWheel}
      style={{ backgroundColor: "#f0f0f0" }}
      // Set the virtual canvas size to 3000x3000 pixels
      width={3000}
      height={3000}
    >
      <Layer>
        <Rect x={50} y={100} width={200} height={200} fill='red' draggable />
      </Layer>
    </Stage>
  );
};

export default CanvasBoard;
