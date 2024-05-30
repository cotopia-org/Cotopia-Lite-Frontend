import { useLiveKitRoom, useTracks } from "@livekit/components-react";
import {
  LocalParticipant,
  RemoteParticipant,
  Room,
  RoomEvent,
} from "livekit-client";
import React, { ReactNode, useEffect, useState } from "react";
import RoomUserSessions from ".";

type Props = {
  room: Room;
  children?: ReactNode;
};
export default function VideoTracks({ room, children }: Props) {
  const [participants, setParticipants] = useState<
    (LocalParticipant | RemoteParticipant)[]
  >([]);

  useEffect(() => {
    function updateParticipant(participant: RemoteParticipant) {
      setParticipants((prev) => [...prev, participant]);
    }

    const connectToRoom = async () => {
      room.on(RoomEvent.ParticipantConnected, updateParticipant);

      room.on(RoomEvent.ParticipantDisconnected, (participant) => {
        setParticipants((prev) =>
          prev.filter((p) => p.identity !== participant.identity)
        );
      });

      // Add already connected participants
      setParticipants([room.localParticipant]);

      return () => {
        room.disconnect();
      };
    };

    connectToRoom();
  }, [room]);

  return <RoomUserSessions participants={participants} />;
}
