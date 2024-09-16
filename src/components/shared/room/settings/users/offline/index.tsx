import TitleEl from "@/components/shared/title-el";
import React from "react";
import { useRoomContext } from "../../../room-context";
import Participants from "@/components/shared/participants";
import moment from "moment";
import { WorkspaceUserType } from "@/types/user";
import ParticipantsWithPopover from "@/components/shared/participants/with-popover";

export default function OfflineUsers() {
  const { workpaceUsers, leaderboard } = useRoomContext();

  const onlines = leaderboard
    ?.filter((x) => x.user.status === "online" && x.user.room_id !== null)
    .map((x) => x.user.id);

  const allOfflineParticipants = workpaceUsers
    .filter((x) => !onlines.includes(x.id))
    .filter((x) => x.last_login !== null)
    .sort((a, b) => moment(b.last_login).unix() - moment(a.last_login).unix());

  return (
    <TitleEl title={`Offline (${allOfflineParticipants.length})`}>
      <ParticipantsWithPopover
        participants={allOfflineParticipants.map((x) => x)}
        customTitle={(x) => {
          const fromNow = moment((x as WorkspaceUserType).last_login).fromNow();

          return `${x.name} (${fromNow})`;
        }}
      />
    </TitleEl>
  );
}
