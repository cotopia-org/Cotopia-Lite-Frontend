import React, { useEffect, useState } from "react";
import { useReactFlow, Node, ReactFlowInstance, Viewport } from "@xyflow/react";

type Props = {
  nodes: Node[];
  viewport: Viewport;
};

const NodesPreview: React.FC<Props> = ({ nodes, viewport }) => {
  const [outOfViewNodes, setOutOfViewNodes] = useState<Node[]>([]);

  useEffect(() => {
    const calculateOutOfViewNodes = () => {
      const minX = -viewport.x / viewport.zoom;
      const maxX = (window.innerWidth - viewport.x) / viewport.zoom;
      const minY = -viewport.y / viewport.zoom;
      const maxY = (window.innerHeight - viewport.y) / viewport.zoom;

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

  return (
    <div
      style={{
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
      }}
    >
      {outOfViewNodes.length === 0 ? (
        <p>All nodes are in the viewport</p>
      ) : (
        <ul className='text-base'>
          {outOfViewNodes.map((node) => (
            <li key={node.id} style={{ marginBottom: 5 }}>
              <div>
                <strong></strong>
              </div>
              <div style={{ fontSize: "0.8em", color: "#888" }}>
                Position: ({node.position.x}, {node.position.y})
              </div>
              {/* Optionally, include a thumbnail or other preview of the node */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NodesPreview;
