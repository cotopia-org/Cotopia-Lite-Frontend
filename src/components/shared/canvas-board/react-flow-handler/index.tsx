import {
  useProfile,
  useSocket,
} from "@/app/(pages)/(protected)/protected-wrapper";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import {
  Background,
  MiniMap,
  //   Background,
  Node,
  NodeChange,
  NodeMouseHandler,
  NodePositionChange,
  NodeSelectionChange,
  ReactFlow,
  ReactFlowInstance,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { useRoomContext } from "../../room/room-context";
import UserNode from "../nodes/user";
import { useCallback, useEffect, useRef, useState } from "react";
import BackgroundNode from "../nodes/background";
import { __VARS } from "@/app/const/vars";
import { Track } from "livekit-client";
import ShareScreen from "../nodes/share-screen";
import { convertCoordinateString } from "@/lib/utils";
import { WorkspaceRoomShortType } from "@/types/room";
import { UserMinimalType } from "@/types/user";
// import { useCanvas } from "..";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
};

const nodeTypes = {
  userNode: UserNode,
  backgroundNode: BackgroundNode,
  shareSreenCard: ShareScreen,
};

type LeftJoinType = {
  room_id: number;
  user: UserMinimalType;
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

  const { room, updateUserCoords, room_id } = useRoomContext();

  const socketParticipants = room?.participants ?? [];

  const socket = useSocket();

  const initState = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  const handleNodesChange = (changes: NodeChange[]) => {
    changes.forEach((change) => {
      switch (change.type) {
        case "position":
          const positionChange = change as NodePositionChange;
          // console.log(
          //   `Node with ID ${positionChange.id} has been moved to position`,
          //   positionChange.position
          // );
          break;
        case "select":
          const selectionChange = change as NodeSelectionChange;
          // console.log(
          //   `Node with ID ${selectionChange.id} was ${
          //     selectionChange.selected ? "selected" : "deselected"
          //   }`
          // );
          break;
        // Handle other change types like 'dimensions', 'remove', etc.
        default:
        // console.log(`Unhandled change type: ${change.type}`);
      }
    });

    // Always apply the changes to keep the nodes state updated
    onNodesChange(changes);
  };

  //Node with background
  const nodesWithBackground = useCallback(
    (nodes: Node[]) => [
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
      ...nodes,
    ],
    []
  );

  const addParticipants = (particpants: UserMinimalType[]) => {
    return particpants.map((participant) => {
      const rfUserId = "" + participant?.username;

      const coords = participant?.coordinates?.split(",");

      let xcoord = rf?.getNode(rfUserId)?.position.x ?? coords?.[0] ?? 200;
      let ycoord = rf?.getNode(rfUserId)?.position.x ?? coords?.[1] ?? 200;

      if (typeof xcoord === "string") xcoord = +xcoord;
      if (typeof ycoord === "string") ycoord = +ycoord;

      const track = tracks.find(
        (a) => a.participant.identity === participant.username
      );

      const isDraggable = user?.username === track?.participant?.identity;

      let object: Node = {
        id: "" + participant?.username,
        type: "userNode",
        data: {
          username: participant.username,
          draggable: isDraggable,
          isDragging: false,
        },
        position: { x: xcoord, y: ycoord },
        parentId: "4214242141",
        extent: "parent",
      };

      if (!isDraggable) object["draggable"] = false;

      return object;
    });
  };

  //Init canvas
  useEffect(() => {
    if (initState.current === false) return;

    //Is we have no participant in room
    if (socketParticipants.length === 0) {
      setNodes(nodesWithBackground([]));
      return;
    }

    setNodes(nodesWithBackground(addParticipants(socketParticipants)));

    initState.current = false;
  }, [socketParticipants, tracks]);

  useEffect(() => {
    setNodes((prev) => [
      ...prev.filter((x) => x.type !== "shareSreenCard"),
      ...tracks
        ?.filter((x) => x.source === Track.Source.ScreenShare)
        ?.map(
          (x, i) =>
            ({
              id: "share-screen-" + i,
              type: "shareSreenCard",
              data: {
                track: x,
              },
              position: {
                x: rf?.getNode("share-screen-" + i)?.position.x ?? 200,
                y: rf?.getNode("share-screen-" + i)?.position.y ?? 200,
              },
              parentId: "4214242141",
              extent: "parent",
            } as Node)
        ),
    ]);
  }, [tracks]);

  const updateUserCoordinate = useCallback((data: UserMinimalType) => {
    const username = data?.username;
    const coordinates = data?.coordinates;

    if (!username) {
      return;
    }

    if (!coordinates) {
      return;
    }

    const coords_array = coordinates.split(",");

    if (coords_array.length !== 2) return;

    let x = coords_array[0];
    let y = coords_array[1];

    updateUserCoords(username, { x: +x, y: +y });

    setNodes((nds) => {
      return nds.map((node) =>
        node.id === username ? { ...node, position: { x: +x, y: +y } } : node
      );
    });
  }, []);

  useSocket("updateCoordinates", (data) => {
    updateUserCoordinate(data);
  });

  useSocket("userLeftFromRoom", (data: LeftJoinType) => {
    const { room_id: gotRoomId, user } = data;

    if (room_id === undefined) return;

    if (gotRoomId !== +room_id) return;

    setNodes((prev) => prev.filter((x) => x.id !== user.username));
  });

  useSocket("userJoinedToRoom", (data: LeftJoinType) => {
    const { room_id: gotRoomId, user } = data;

    if (room_id === undefined) return;

    if (gotRoomId !== +room_id) return;

    setNodes((prev) => [...prev, ...addParticipants([user])]);
  });

  const onNodeDragStop: NodeMouseHandler = (event, node) => {
    if (node?.data?.draggable) {
      if (!socket) return;

      const livekitIdentity = node?.data?.username as string;

      socket.emit("updateCoordinates", {
        room_id: room?.id,
        coordinates: `${node.position.x},${node.position.y}`,
        username: livekitIdentity,
      });

      updateUserCoords(livekitIdentity, node.position);
    }
  };

  return (
    <ReactFlow
      style={{ width: "100%", height: "100%" }}
      nodesDraggable={true}
      onNodeDragStop={onNodeDragStop}
      onNodesChange={handleNodesChange}
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
      {/* {!!viewPort && (
        <div className='fixed top-4 right-4 z-[10]'>
          <NodesPreview viewport={viewPort} nodes={nodes} />
        </div>
      )} */}
      <MiniMap />
      <Background />
    </ReactFlow>
  );
}

export default ReactFlowHandler;
