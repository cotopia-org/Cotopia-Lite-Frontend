import CotopiaButton from "@/components/shared-ui/c-button";
import FullLoading from "@/components/shared/full-loading";
import Participants from "@/components/shared/participants";
import TitleEl from "@/components/shared/title-el";
import { useApi } from "@/hooks/swr";
import { LeaderboardType } from "@/types/leaderboard";
import { WorkspaceUserType } from "@/types/user";
import React, { useState } from "react";
import { useSocket } from "../../../protected-wrapper";
import moment from "moment";

type Props = {
  workspace_id: string;
  limit?: number;
};
export default function WorkspaceParticipants({ workspace_id, limit }: Props) {
  const { data: leaderboardData, mutate: leaderboardMutate } = useApi(
    `/workspaces/${workspace_id}/leaderboard`
  );

  const leaderboard: LeaderboardType[] = leaderboardData?.data ?? [];

  const onlines = leaderboard
    ?.filter((x) => x.user.status === "online" && x.user.room_id !== null)
    .map((x) => x.user.id);

  const [isExpand, setIsExpand] = useState(false);

  const {
    data,
    isLoading,
    mutate: userMutate,
  } = useApi(`/workspaces/${workspace_id}/users`);

  useSocket("userLeftFromRoom", () => {
    leaderboardMutate();
    userMutate();
  });

  useSocket("userJoinedToRoom", () => {
    leaderboardMutate();
    userMutate();
  });

  const participants: WorkspaceUserType[] =
    data !== undefined ? data?.data : [];

  if (isLoading || data === undefined) return <FullLoading />;

  const allOfflineParticipants = participants.filter(
    (x) => !onlines.includes(x.id)
  );

  let finalParticipants = [...allOfflineParticipants];

  finalParticipants = finalParticipants
    .filter((x) => x.last_login !== null)
    .sort((a, b) => moment(b.last_login).unix() - moment(a.last_login).unix());

  if (limit && isExpand === false) {
    finalParticipants = finalParticipants.slice(0, limit);
  }

  if (finalParticipants.length === 0) return;

  return (
    <TitleEl title='Offline' className='flex-col items-start'>
      <Participants
        participants={finalParticipants}
        customTitle={(x) => {
          const fromNow = moment((x as WorkspaceUserType).last_login).fromNow();

          return `${x.name} (${fromNow})`;
        }}
      />
      {!!limit && allOfflineParticipants.length > limit && (
        <CotopiaButton
          variant={"outline"}
          onClick={() => setIsExpand((prev) => !prev)}
          className='!px-4'
        >
          {isExpand ? `Show less` : "Show more"}
          {!isExpand && ` +(${allOfflineParticipants.length - limit})`}
        </CotopiaButton>
      )}
    </TitleEl>
  );
}
