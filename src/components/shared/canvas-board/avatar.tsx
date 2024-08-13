import Konva from "konva";
import React, { useEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

export default function CanvasAvatar() {
  const handleDragMove = (e: any) => {
    const node = e.target;
    const stage = node.getStage();
    const bounds = stage.getClientRect();

    // Get the position of the shape
    const { x, y } = node.position();

    // Ensure the shape stays within bounds
    if (x < 0) node.position({ x: 0, y });
    if (x + node.width() > bounds.width)
      node.position({ x: bounds.width - node.width(), y });
    if (y < 0) node.position({ x, y: 0 });
    if (y + node.height() > bounds.height)
      node.position({ x, y: bounds.height - node.height() });

    node.getLayer()?.batchDraw();
  };

  const [image] = useImage(
    `https://lite-api3.cotopia.social/storage/images/M4kxY5OKglaqRBtYnm06OXr2nCMbtGgUrtqx0X3U.jpg`
  );

  return (
    <>
      {image && (
        <Image
          image={image}
          x={100}
          y={100}
          width={80}
          height={80}
          clipFunc={(ctx: any) => {
            // Define the clip (mask) function
            ctx.beginPath();
            ctx.arc(150, 150, 150, 0, Math.PI * 2, false);
            ctx.clip();
          }}
          draggable
          cornerRadius={50}
          strokeWidth={4}
          stroke={"#000"}
          onDragMove={handleDragMove}
        />
      )}
    </>
  );
}
