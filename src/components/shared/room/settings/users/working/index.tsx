import TitleEl from "@/components/shared/title-el";
import React from "react";
import { useRoomContext } from "../../../room-context";
import Participants from "@/components/shared/participants";

export default function WorkingUsers() {
  const { leaderboard, workspace_id } = useRoomContext();

  const workingUsers = leaderboard.filter(
    (x) =>
      x.user.active === 1 &&
      x.user.room_id !== null &&
      x.user.workspace_id === +(workspace_id as string)
  );

  const workingUserCounts = workingUsers.length;

  return (
    <TitleEl title={`Working (${workingUserCounts})`}>
      <Participants participants={workingUsers.map((x) => x.user)} />
    </TitleEl>
  );
}
