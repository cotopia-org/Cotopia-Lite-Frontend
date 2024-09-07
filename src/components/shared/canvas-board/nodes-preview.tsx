import React, { useEffect, useState } from "react";
import { useReactFlow, Node, ReactFlowInstance, Viewport } from "@xyflow/react";
import useWindowSize from "@/hooks/use-window-size";

type Props = {
  nodes: Node[];
  viewport: Viewport;
};

const NodesPreview: React.FC<Props> = ({ nodes, viewport }) => {
  const {
    windowSize: { windowWidth, windowHeight },
  } = useWindowSize();

  const [outOfViewNodes, setOutOfViewNodes] = useState<Node[]>([]);

  useEffect(() => {
    const calculateOutOfViewNodes = () => {
      const minX = -viewport.x / viewport.zoom;
      const maxX = (windowWidth - viewport.x) / viewport.zoom;
      const minY = -viewport.y / viewport.zoom;
      const maxY = (windowHeight - viewport.y) / viewport.zoom;

      const outOfViewNodes = nodes
        .filter((x) => x.type !== "backgroundNode")
        .filter((node) => {
          const nodeX = node.position.x + (node.width ?? 0) / 2;
          const nodeY = node.position.y + (node.height ?? 0) / 2;

          return nodeX < minX || nodeX > maxX || nodeY < minY || nodeY > maxY;
        });

      setOutOfViewNodes(outOfViewNodes);
    };

    calculateOutOfViewNodes();

    window.addEventListener("resize", calculateOutOfViewNodes);
    window.addEventListener("scroll", calculateOutOfViewNodes);

    return () => {
      window.removeEventListener("resize", calculateOutOfViewNodes);
      window.removeEventListener("scroll", calculateOutOfViewNodes);
    };
  }, [nodes, viewport]);

  if (outOfViewNodes.length === 0) return;

  return (
    <div className='fixed z-40'>
      {outOfViewNodes.map((node) => {
        const objX = node.position.x;
        const objY = node.position.y;
        const zoom = viewport.zoom;
        let previewX, previewY;

        // Determine if the object is out of the viewport
        const isLeft = objX < viewport.x;
        const isRight = objX > viewport.x + windowWidth / zoom;
        const isAbove = objY < viewport.y;
        const isBelow = objY > viewport.y + windowHeight / zoom;

        if (!isLeft && !isRight && !isAbove && !isBelow) return null;

        if (isLeft) {
          previewX = 0;
          previewY = Math.min(
            Math.max((objX - viewport.y) * zoom, 0),
            windowHeight - 50
          );
        } else if (isRight) {
          previewX = windowWidth - 50;
          previewY = Math.min(
            Math.max((objY - viewport.y) * zoom, 0),
            windowHeight - 50
          );
        } else if (isAbove) {
          previewX = Math.min(
            Math.max((objX - viewport.x) * zoom, 0),
            windowWidth - 50
          );
          previewY = 0;
        } else if (isBelow) {
          previewX = Math.min(
            Math.max((objX - viewport.x) * zoom, 0),
            windowWidth - 50
          );
          previewY = windowHeight - 50;
        }

        return (
          <div
            key={node.id}
            style={{
              position: "fixed",
              left: previewX,
              top: previewY,
              width: 50,
              height: 50,
              background: "lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
            }}
          >
            {/* Custom rendering of the preview */}H
          </div>
        );
      })}
    </div>
  );
};

export default NodesPreview;
