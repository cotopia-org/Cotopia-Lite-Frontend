import React, { useEffect, useState } from "react";
import { RoomEvent } from "livekit-client";
import { useRoomContext } from "@livekit/components-react";
import CModal from "@/components/shared-ui/c-modal";
import Disconnected from "./disconnected";

function LiveKitConnectionStatus() {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");

  const room = useRoomContext();

  useEffect(() => {
    const onConnect = () => {
      setConnectionStatus(RoomEvent.Connected);
    };
    const onDisConnect = () => {
      setConnectionStatus(RoomEvent.Disconnected);
    };
    const onReconnecting = () => {
      setConnectionStatus(RoomEvent.Reconnecting);
    };
    const onReconnected = () => {
      setConnectionStatus(RoomEvent.Reconnected);
    };

    const connectToRoom = async () => {
      if (!room) return;

      // Handle connection events
      room.on(RoomEvent.Connected, onConnect);

      room.on(RoomEvent.Disconnected, onDisConnect);

      room.on(RoomEvent.Reconnecting, onReconnecting);

      room.on(RoomEvent.Reconnected, onReconnected);

      room.on(RoomEvent.Reconnecting, onReconnecting);
    };

    connectToRoom();

    return () => {
      // Clean up event listeners when the component unmounts or room changes
      if (room) {
        room.off(RoomEvent.Connected, onConnect);
        room.off(RoomEvent.Disconnected, onDisConnect);
        room.off(RoomEvent.Reconnecting, onReconnecting);
        room.off(RoomEvent.Reconnected, onReconnected);
        room.off(RoomEvent.Reconnecting, onReconnecting);
        room.disconnect();
      }
    };
  }, []);

  if (connectionStatus == RoomEvent.Disconnected)
    return (
      <CModal className='flex flex-col items-center justify-center'>
        <Disconnected />
      </CModal>
    );

  return null;
}

export default LiveKitConnectionStatus;
