"use client";

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { playSoundEffect } from "@/lib/sound-effects";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import { useEffect, useState } from "react";
import ModalDisconnected from "../room/connection-status/modal-disconnected";
import { useRouter } from "next/navigation";
import useNetworkStatus from "@/hooks/use-net";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
  workspace_id: string;
  room_id: string;
};
export default function RoomSpatialWrapper({
  token,
  workspace_id,
  room_id,
}: Props) {
  const [isReConnecting, setIsReconnecting] = useState(false);

  const { isOnline } = useNetworkStatus();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [room, setRoom] = useState<WorkspaceRoomType>();

  const [socketConnected, setSocketConnected] = useState(true);

  const socket = useSocket();

  const router = useRouter();

  const handleJoin = async () => {
    if (isOnline === false) {
      return;
    }

    const res = await axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
      `/rooms/${room_id}/join`
    );

    //Join user to the room by socket request
    if (socket) socket.emit("joinedRoom", room_id);

    const livekitToken = res.data.data.token; //Getting livekit token from joinObject

    playSoundEffect("joined");

    setIsReconnecting(false);

    if (livekitToken) {
      router.push(
        `/workspaces/${workspace_id}/rooms/${room_id}?token=${livekitToken}`
      );
      return;
    }
  };

  const handleConnectToSocket = () => {
    if (!socket) return;

    if (!room_id) return;

    setIsReconnecting(true);

    handleJoin();
  };

  const fetchRoom = () => {
    startLoading();
    axiosInstance
      .get<FetchDataType<WorkspaceRoomType>>(`/rooms/${room_id}`)
      .then(async (res) => {
        setRoom(res?.data?.data);
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };

  useEffect(() => {
    if (!socket) return;

    if (!isOnline) return;

    socket.on("joinedInRoom", () => {
      if (isLoading) return;
      fetchRoom();
    });

    return () => {
      socket.off("joinedInRoom");
    };
  }, [socket, room_id, isLoading, isOnline]);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      setSocketConnected(true);
    };

    const onDisconnect = () => {
      setSocketConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socketConnected) {
      playSoundEffect("userGotClosed");
    }
  }, [socketConnected]);

  if (socketConnected === false)
    return <ModalDisconnected onReTry={handleConnectToSocket} />;

  return (
    <div className='overflow-hidden max-h-screen'>
      <RoomWrapper>
        <RoomHolder
          token={token}
          room={room}
          onRoomUpdated={setRoom}
          room_id={room_id}
          workspace_id={workspace_id}
          isReConnecting={isReConnecting}
        />
      </RoomWrapper>
    </div>
  );
}
