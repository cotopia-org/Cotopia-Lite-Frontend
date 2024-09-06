import CotopiaButton from "@/components/shared-ui/c-button";
import FullLoading from "@/components/shared/full-loading";
import Participants from "@/components/shared/participants";
import TitleEl from "@/components/shared/title-el";
import { useApi } from "@/hooks/swr";
import { LeaderboardType } from "@/types/leaderboard";
import { UserMinimalType } from "@/types/user";
import React, { useState } from "react";
import { useSocket } from "../../../protected-wrapper";

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

  useSocket("userLeft", () => {
    leaderboardMutate();
    userMutate();
  });

  useSocket("userJoined", () => {
    leaderboardMutate();
    userMutate();
  });

  const participants: UserMinimalType[] = data !== undefined ? data?.data : [];

  if (isLoading || data === undefined) return <FullLoading />;

  const allOfflineParticipants = participants.filter(
    (x) => !onlines.includes(x.id)
  );

  let finalParticipants = [...allOfflineParticipants];

  if (limit && isExpand === false) {
    finalParticipants = finalParticipants.slice(0, limit);
  }

  if (finalParticipants.length === 0) return;

  return (
    <TitleEl title='Offline' className='flex-col items-start'>
      <Participants participants={finalParticipants} />
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
