// Canvas.tsx
import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Circle, Text, Image } from "react-konva";
import CanvasAvatar from "./avatar";
import Konva from "konva";
import useImage from "use-image";

const Canvas: React.FC = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const isDragging = useRef<boolean>(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (stageRef.current) {
      isDragging.current = true;
      lastPos.current = stageRef.current.getPointerPosition();
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isDragging.current && stageRef.current) {
      const stage = stageRef.current;
      const pointerPos = stage.getPointerPosition();
      if (lastPos.current && pointerPos) {
        const dx = pointerPos?.x - lastPos.current.x;
        const dy = pointerPos?.y - lastPos.current.y;
        stage.position({
          x: stage.x() + dx!,
          y: stage.y() + dy!,
        });
        stage.batchDraw();
        lastPos.current = pointerPos;
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const [imgBack] = useImage(
    "https://lite.cotopia.social/_next/image?url=%2Fassets%2Fmock%2Fgallery%2Ftemplate%2Fspatial-5.png&w=3840&q=75"
  );

  return (
    <Stage
      width={1920}
      height={1080}
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      draggable={false}
      style={{
        backgroundColor: "#eeeeee",
      }}
    >
      <Layer>
        <Image image={imgBack} x={0} y={0} width={3000} height={3000} />
        <CanvasAvatar />
      </Layer>
    </Stage>
  );
};

export default Canvas;
