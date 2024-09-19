import Participants from "@/components/shared/participants";
import { UserType } from "@/types/user";
import React, { useMemo } from "react";
import { useRoomContext } from "../../../room-context";

type Props = {
  user: UserType;
};

export default function WorkingCard({ user }: Props) {
  const { workspaceJobs } = useRoomContext();

  const userJobs = useMemo(() => {
    let jobs = [];

    for (let job of workspaceJobs) {
      const jobMembers = job.members ?? [];
      const jobMemberIds = jobMembers.map((x) => x.id);

      if (jobMemberIds.includes(user.id)) {
        jobs.push(job);
      }
    }

    return jobs.filter((x) => x.status === "in_progress");
  }, [workspaceJobs]);

  return (
    <div className='flex flex-row gap-x-2 items-center'>
      <Participants className='!pb-0' participants={[user]} />
      <span className='text-sm capitalize'>
        {userJobs.map((x) => x.title).join(", ")}
      </span>
    </div>
  );
}
