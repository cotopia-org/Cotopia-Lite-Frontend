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
  ReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { useRoomContext } from "../../room/room-context";
import UserNode from "../nodes/user";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BackgroundNode from "../nodes/background";
import { __VARS } from "@/app/const/vars";
import { Track } from "livekit-client";
import ShareScreen from "../nodes/share-screen";
import { UserMinimalType } from "@/types/user";
import JailNode from "../nodes/jail-node";
import { uniqueById } from "@/lib/utils";
import { playSoundEffect } from "@/lib/sound-effects";
import Toolbar from "../../room/toolbar";
import TopLeftTools from "../../room/tools/top-left";
import TopRightTools from "../../room/tools/top-right";
import BottomLeftTools from "../../room/tools/bottom-left";
import BottomMiddleTools from "../../room/tools/bottom-middle";
import BottomRightTools from "../../room/tools/bottom-right";
import useBus, { dispatch } from "use-bus";
import { _BUS } from "@/app/const/bus";

export const RF_BACKGROUND_ID = "bg-node-4214242141";
export const RF_JAIL_ID = "jail-78412641267";

type Props = {
  tracks: TrackReferenceOrPlaceholder[];
};

const nodeTypes = {
  userNode: UserNode,
  backgroundNode: BackgroundNode,
  jailNode: JailNode,
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

  const { room, updateUserCoords, room_id } = useRoomContext();

  const socketParticipants = useMemo(() => {
    return room?.participants ?? [];
  }, [room?.participants]);

  const socket = useSocket();

  const initState = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  const handleNodesChange = (changes: NodeChange[]) => {
    // Always apply the changes to keep the nodes state updated
    onNodesChange(changes);
  };

  //Node with background
  const nodesWithBackground = useCallback(
    (nodes: Node[]) => [
      {
        id: RF_BACKGROUND_ID,
        position: {
          x: -500,
          y: -700,
        },
        type: "backgroundNode",
        draggable: false,
        data: {},
        focusable: false,
        deletable: false,
        selectable: false,
      },
      {
        id: RF_JAIL_ID,
        position: {
          x: -400,
          y: -400,
        },
        type: "jailNode",
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
    return uniqueById(
      particpants.map((participant) => {
        const rfUserId = "" + participant?.username;

        const coords = participant?.coordinates?.split(",");

        let xcoord = rf?.getNode(rfUserId)?.position.x ?? coords?.[0] ?? 200;
        let ycoord = rf?.getNode(rfUserId)?.position.y ?? coords?.[1] ?? 200;

        if (typeof xcoord === "string") xcoord = +xcoord;
        if (typeof ycoord === "string") ycoord = +ycoord;

        const track = tracks.find(
          (a) => a.participant.identity === participant.username
        );

        const isDraggable = user?.username === participant.username;

        let object: Node = {
          id: "" + participant?.username,
          type: "userNode",
          data: {
            username: participant.username,
            draggable: isDraggable,
            isDragging: false,
          },
          position: { x: xcoord, y: ycoord },
          parentId: RF_JAIL_ID,
          extent: "parent",
        };

        if (!isDraggable) object["draggable"] = false;

        return object;
      })
    ) as Node[];
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
  }, [socketParticipants]);

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
              parentId: RF_JAIL_ID,
              extent: "parent",
            } as Node)
        ),
    ]);
  }, [tracks]);

  const updateUserCoordinate = (data: UserMinimalType) => {
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
  };

  useSocket(
    "updateCoordinates",
    (data) => {
      updateUserCoordinate(data);
    },
    [updateUserCoordinate]
  );

  useBus(_BUS.changeMyUserCoord, (data) => {
    console.log("data", data.data);
    updateUserCoordinate(data.data);
  });

  useSocket(
    "userLeftFromRoom",
    (data: LeftJoinType) => {
      const { room_id: gotRoomId, user: targetUser } = data;

      if (room_id === undefined) return;

      if (gotRoomId !== +room_id) return;

      setNodes(
        (prev) =>
          uniqueById(prev.filter((x) => x.id !== targetUser.username)) as Node[]
      );

      if (user.id !== targetUser.id) playSoundEffect("elseUserleft");
    },
    []
  );

  useSocket(
    "userJoinedToRoom",
    (data: LeftJoinType) => {
      const { room_id: gotRoomId, user: targetUser } = data;

      if (room_id === undefined) return;

      if (gotRoomId !== +room_id) return;

      setNodes((prev) => {
        const nNodes = uniqueById([
          ...prev,
          ...addParticipants([targetUser]),
        ]) as Node[];

        return nNodes;
      });

      if (user.id !== targetUser.id) playSoundEffect("elseUserJoin");
    },
    []
  );

  const onNodeDragStop: NodeMouseHandler = (event, node) => {
    if (node?.data?.draggable) {
      const newCoords = `${node.position.x},${node.position.y}`;

      const username: string = node.data.username as string;
      const sendingObject = {
        room_id: room?.id,
        coordinates: newCoords,
        username,
      };

      socket?.emit("updateCoordinates", sendingObject);

      dispatch({
        type: _BUS.changeMyUserCoord,
        data: {
          ...user,
          coordinates: newCoords,
        },
      });

      const livekitIdentity = username;

      updateUserCoords(livekitIdentity, node.position);
    }
  };

  return (
    <>
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
        translateExtent={[
          [-500, -500],
          [4000, 1600],
        ]}
      >
        {/* <MiniMap /> */}
        <Background />
        <Toolbar
          topLeft={<TopLeftTools />}
          topRight={<TopRightTools />}
          bottomLeft={<BottomLeftTools />}
          bottomMiddle={<BottomMiddleTools />}
          bottomRight={<BottomRightTools />}
        />
      </ReactFlow>
      {/* {!!viewPort && (
        <NodesPreview tracks={tracks} nodes={nodes} viewport={viewPort} />
      )} */}
    </>
  );
}

export default ReactFlowHandler;
