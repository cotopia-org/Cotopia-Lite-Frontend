"use client";

import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import RoomHolder from "@/components/shared/room";
import RoomWrapper from "@/components/shared/room/wrapper";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { playSoundEffect } from "@/lib/sound-effects";
import { WorkspaceRoomJoinType, WorkspaceRoomType } from "@/types/room";
import { useEffect, useState } from "react";
import useNetworkStatus from "@/hooks/use-net";
import useSetting from "@/hooks/use-setting";
import useQueryParams from "@/hooks/use-query-params";
import Disconnected from "../room/connection-status/disconnected";

type Props = {
  token: string; //Currently we are using livekit, so livekit token
  workspace_id: string;
  room_id: number;
};
export default function RoomSpatialWrapper({
  token,
  workspace_id,
  room_id,
}: Props) {
  const settings = useSetting();

  const [isReConnecting, setIsReconnecting] = useState(false);

  const { query } = useQueryParams();

  const [isSwitching, setIsSwitching] = useState(false);
  useEffect(() => {
    if (query?.isSwitching) {
      setIsSwitching(true);
    }
  }, [query?.isSwitching]);

  const { isOnline } = useNetworkStatus();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const [room, setRoom] = useState<WorkspaceRoomType>();

  const [socketConnected, setSocketConnected] = useState(true);

  const socket = useSocket();

  const handleConnectToSocket = () => {
    if (socket?.connected === false) return;

    if (!room_id) return;

    setIsReconnecting(true);
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

  useSocket("roomUpdated", (data) => {
    setRoom(data);
  });

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
    const onConnect = () => {
      console.log("connect to socket io");

      setSocketConnected(true);

      socket?.emit("joinedRoom", room_id);

      setTimeout(() => {
        axiosInstance.get<FetchDataType<WorkspaceRoomJoinType>>(
          `/rooms/${room_id}/join`
        );
      }, 500);
    };

    const onDisconnect = () => {
      console.log("disconnected from socket io");
      setSocketConnected(false);
    };

    socket?.on("connect", onConnect);
    socket?.on("disconnect", onDisconnect);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socketConnected && settings.sounds.userJoinLeft) {
      playSoundEffect("userGotClosed");
    }
  }, [socketConnected, settings.sounds.userJoinLeft]);

  return (
    <div className='max-h-screen'>
      <RoomWrapper>
        {!!!socketConnected && <Disconnected onReTry={handleConnectToSocket} />}
        <RoomHolder
          token={token}
          room={room}
          onRoomUpdated={(room) => {
            setRoom(room);
          }}
          room_id={room_id}
          workspace_id={workspace_id}
          isReConnecting={isReConnecting}
          isSwitching={isSwitching}
        />
      </RoomWrapper>
    </div>
  );
}
