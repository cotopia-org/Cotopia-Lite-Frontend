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
import BackgroundNode from "../background";
import { __VARS } from "@/app/const/vars";
import NodesPreview from "../nodes-preview";
// import { useCanvas } from "..";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
};

const nodeTypes = {
  userNode: UserNode,
  backgroundNode: BackgroundNode,
};

function ReactFlowHandler({ tracks }: Props) {
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
    setNodes([
      {
        id: "4214242141",
        position: {
          x: 0,
          y: 0,
        },
        type: "backgroundNode",
        draggable: false,
        data: {},
        focusable: false,
        deletable: false,
        selectable: false,
      },
      ...participants.map((x, index) => {
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
          parentId: "4214242141",
          extent: "parent",
        };

        if (!isDraggable) object["draggable"] = false;

        return object;
      }),
    ]);
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

      updateUserCoords(livekitIdentity, node.position);
    }
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <ReactFlow
      style={{ width: "100%", height: "100%" }}
      nodesDraggable={true}
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
      fitView
    >
      {!!viewPort && (
        <div className='fixed top-4 right-4 z-[10]'>
          <NodesPreview viewport={viewPort} nodes={nodes} />
        </div>
      )}
      <MiniMap />
      <Background />
    </ReactFlow>
  );
}

export default ReactFlowHandler;
