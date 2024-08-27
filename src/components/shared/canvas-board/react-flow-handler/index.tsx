import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import {
  TrackReferenceOrPlaceholder,
  useParticipants,
} from "@livekit/components-react";
import {
  applyNodeChanges,
  Background,
  MiniMap,
  //   Background,
  Node,
  NodeMouseHandler,
  OnNodesChange,
  ReactFlow,
  ReactFlowInstance,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { useRoomContext } from "../../room/room-context";
import UserNode from "../user";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertCoordinateString } from "@/lib/utils";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
};

const nodeTypes = {
  userNode: UserNode,
};

export default function ReactFlowHandler({ tracks }: Props) {
  const [viewPort, setViewPort] = useState<Viewport>();

  const [rf, setRf] = useState<ReactFlowInstance>();
  const { user } = useProfile();

  useEffect(() => {
    if (!rf) return;

    if (!user?.coordinates) return;

    const position = convertCoordinateString(user.coordinates);

    if (!position) return;

    const mainRoomHolder = document.getElementById("main-room-holder");

    if (!mainRoomHolder) return;

    const mainRoomHolderObject = mainRoomHolder.getBoundingClientRect();

    setViewPort({
      x: -1 * position?.x + mainRoomHolderObject.width / 2,
      y: -1 * position?.y + mainRoomHolderObject.height / 2,
      zoom: rf.getZoom(),
    });
  }, [user?.coordinates, rf]);

  const { room, updateUserCoords } = useRoomContext();

  const socketParticipants = room?.participants ?? [];

  const participants = useParticipants();

  const socket = useSocket();

  const [nodes, setNodes] = useNodesState<Node>([]);
  useEffect(() => {
    setNodes(
      participants.map((x, index) => {
        const targetUser = socketParticipants.find(
          (a) => a.username === x.identity
        );

        const coords = targetUser?.coordinates?.split(",");

        let xcoord = coords?.[0] ?? 200;
        let ycoord = coords?.[1] ?? 200;

        if (typeof xcoord === "string") xcoord = +xcoord;
        if (typeof ycoord === "string") ycoord = +ycoord;

        const track = tracks[index];

        const isDraggable = user?.username === track?.participant?.identity;

        let object: Node = {
          id: "" + targetUser?.id,
          type: "userNode",
          data: {
            track,
            draggable: isDraggable,
            isDragging: false,
          },
          position: { x: xcoord, y: ycoord },
        };

        if (!isDraggable) object["draggable"] = false;

        return object;
      })
    );
  }, [participants, socketParticipants, tracks]);

  const onNodeDragStop: NodeMouseHandler = (event, node) => {
    if (node?.data?.draggable) {
      if (!socket) return;

      const livekitIdentity = (node?.data?.track as TrackReferenceOrPlaceholder)
        ?.participant.identity;

      socket.emit("updateCoordinates", {
        room_id: room?.id,
        coordinates: `${node.position.x},${node.position.y}`,
        username: livekitIdentity,
      });

      setNodes((prev) =>
        prev.map((x) => {
          if (
            (x.data?.track as any)?.participant?.identity === livekitIdentity
          ) {
            return {
              ...x,
              position: {
                x: +node.position.x,
                y: +node.position.y,
              },
              data: {
                ...x?.data,
                isDragging: false,
              },
            };
          }

          return x;
        })
      );

      updateUserCoords(livekitIdentity, node.position);
    }
  };

  // Define the bounds: (minX, minY) and (maxX, maxY)
  const nodeExtent: any = [
    [60, 60],
    [3000, 2340],
  ];

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onMoveEnd = useCallback((_: any, a: any) => {
    const { x, y, zoom } = a;

    // Ensure that the position stays within the 3000x3000 bounds
    const maxPosition = 2300;
    const minPosition = -maxPosition + window.innerWidth;

    let newX = Math.max(minPosition, Math.min(x, 0));
    let newY = Math.max(minPosition, Math.min(y, 0));

    if (newX !== x || newY !== y) {
      setViewPort({ x: newX, y: newY, zoom });
    }
  }, []);

  return (
    <ReactFlow
      style={{ width: "100%", height: "100%" }}
      nodeExtent={nodeExtent}
      nodesDraggable={true}
      onNodeDrag={(x, a) => {
        console.log("a", a);
      }}
      onNodeDragStop={onNodeDragStop}
      onNodesChange={onNodesChange}
      panOnDrag={true}
      zoomOnScroll={true}
      zoomOnPinch={true}
      nodes={nodes}
      nodeTypes={nodeTypes}
      onInit={setRf}
      viewport={viewPort}
      onViewportChange={setViewPort}
      onMove={onMoveEnd}
      fitView
    >
      <MiniMap />
      <Background />
    </ReactFlow>
  );
}
