import React, { useMemo } from "react";
import UserSession from "@/app/(pages)/(protected)/session";
import { useParticipants, useTracks } from "@livekit/components-react";

const UserNode = (props: any) => {
  const { data, dragging } = props;

  const tracks = useTracks();
  const participants = useParticipants();
  const track = useMemo(() => {
    if (!data?.username) return undefined;

    if (tracks.length === 0) return undefined;

    return tracks.find((x) => x.participant.identity === data.username);
  }, [tracks, data.username]);

  const participant = useMemo(() => {
    if (participants.length === 0) return undefined;

    return participants.find((x) => x.identity === data.username);
  }, [participants, data.username]);

  return (
    <UserSession
      participant={participant}
      track={track}
      draggable={data?.draggable ?? false}
      isDragging={dragging}
    />
  );
};

export default UserNode;
