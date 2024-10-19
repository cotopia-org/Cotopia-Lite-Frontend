import React, { useEffect, useState } from "react";
import { Node, Viewport } from "@xyflow/react";
import UserSession from "@/app/(pages)/(protected)/session";
import {
  TrackReferenceOrPlaceholder,
  useParticipants,
} from "@livekit/components-react";
import useWindowSize from "@/hooks/use-window-size";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import useObjectSize from "@/hooks/use-object-size";

type Props = {
  nodes: Node[];
  viewport: Viewport;
  tracks: TrackReferenceOrPlaceholder[];
};

const NodesPreview: React.FC<Props> = ({ tracks, nodes, viewport }) => {
  const { user } = useProfile();

  const participants = useParticipants();

  const {
    objectSize: { width, height },
  } = useObjectSize("canvas-board");

  const [outOfViewNodes, setOutOfViewNodes] = useState<Node[]>([]);

  const viewportX = viewport.x - 300;
  const viewportY = viewport.y - 300;

  useEffect(() => {
    const calculateOutOfViewNodes = () => {
      const minX = -viewportX / viewport.zoom;
      const maxX = (width - viewportX) / viewport.zoom;
      const minY = -viewportY / viewport.zoom;
      const maxY = (height - viewportY) / viewport.zoom;

      const outOfViewNodes = nodes.filter((node) => {
        const nodeX = node.position.x;
        const nodeY = node.position.y;

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
  }, [nodes, viewportX, viewportY, width, height]);

  if (outOfViewNodes.length === 0) return null;

  const finalNodes = outOfViewNodes
    .filter((x) => x.type === "userNode")
    .filter((x) => x.id !== user.username);

  console.log("outOfViewNodes", outOfViewNodes);

  return (
    <div className='z-40'>
      {finalNodes.map((node) => {
        const objX = node.position.x;
        const objY = node.position.y;
        const zoom = viewport.zoom;

        let previewX, previewY;

        // Adjust the logic for determining if the node is outside the viewport
        const isLeft = objX < -viewportX / zoom;
        const isRight = objX > (-viewportX + width) / zoom;
        const isAbove = objY < -viewportY / zoom;
        const isBelow = objY > (-viewportY + height) / zoom;

        if (!isLeft && !isRight && !isAbove && !isBelow) return null;

        // Adjusting the preview position based on the node's coordinates
        if (isLeft) {
          previewX = 0; // Stick to the left edge
          previewY = Math.min(
            Math.max((objY + viewportY) / zoom, 0),
            height - 50
          );
        } else if (isRight) {
          previewX = width; // Stick to the right edge
          previewY = Math.min(Math.max((objY + viewportY) / zoom, 0), height);
        } else if (isAbove) {
          previewX = Math.min(
            Math.max((objX + viewportX) / zoom, 0),
            width - 50
          );
          previewY = 0; // Stick to the top edge
        } else if (isBelow) {
          previewX = Math.min(
            Math.max((objX + viewportX) / zoom, 0),
            width - 50
          );
          previewY = height - 50; // Stick to the bottom edge
        }

        const p = participants.find((x) => x.identity === node.id);
        const track = tracks.find((x) => x.participant.identity === node.id);

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
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
            <UserSession
              participant={p}
              track={track}
              username={track?.participant?.identity as string}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NodesPreview;
