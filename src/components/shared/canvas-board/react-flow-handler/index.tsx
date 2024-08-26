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
  //   Background,
  MiniMap,
  Node,
  NodeMouseHandler,
  OnNodesChange,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import { useRoomContext } from "../../room/room-context";
import UserNode from "../user";
import { useCallback, useEffect } from "react";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
};

const nodeTypes = {
  userNode: UserNode,
};

export default function ReactFlowHandler({ tracks }: Props) {
  const { user } = useProfile();

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
    [0, 0],
    [3000, 3000],
  ];

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <ReactFlow
      style={{ width: "100%", height: "100%" }}
      nodeExtent={nodeExtent}
      nodesDraggable={true}
      //   onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      onNodesChange={onNodesChange}
      panOnDrag={true}
      zoomOnScroll={true}
      zoomOnPinch={true}
      nodes={nodes}
      nodeTypes={nodeTypes}
    >
      {/* <MiniMap /> */}
      {/* <Background /> */}
    </ReactFlow>
  );
}
