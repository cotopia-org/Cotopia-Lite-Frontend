import CotopiaButton from "@/components/shared-ui/c-button";
import FullLoading from "@/components/shared/full-loading";
import Participants from "@/components/shared/participants";
import TitleEl from "@/components/shared/title-el";
import { useApi } from "@/hooks/swr";
import { UserMinimalType } from "@/types/user";
import React, { useState } from "react";

type Props = {
  workspace_id: string;
  limit?: number;
};
export default function WorkspaceParticipants({ workspace_id, limit }: Props) {
  const [isExpand, setIsExpand] = useState(false);

  const { data, isLoading } = useApi(`/workspaces/${workspace_id}/users`);

  const participants: UserMinimalType[] = data !== undefined ? data?.data : [];

  if (isLoading || data === undefined) return <FullLoading />;

  let finalParticipants = [...participants];

  if (limit && isExpand === false) {
    finalParticipants = finalParticipants.slice(0, limit);
  }

  if (finalParticipants.length === 0) return;

  return (
    <TitleEl title='Participants' className='flex-col items-start'>
      <Participants participants={finalParticipants} />
      {!!limit && participants.length > limit && (
        <CotopiaButton
          variant={"outline"}
          onClick={() => setIsExpand((prev) => !prev)}
          className='!px-4'
        >
          {isExpand ? `Show less` : "Show more"}
          {!isExpand && ` +(${participants.length - limit})`}
        </CotopiaButton>
      )}
    </TitleEl>
  );
}
