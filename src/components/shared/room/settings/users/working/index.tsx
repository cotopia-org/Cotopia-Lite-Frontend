import TitleEl from "@/components/shared/title-el";
import { useRoomContext } from "../../../room-context";
import ParticipantsWithPopover from "@/components/shared/participants/with-popover";

export default function WorkingUsers() {
  const { leaderboard, workspace_id, workspaceJobs } = useRoomContext();

  let usersHaveSchedules: number[] = [];
  for (let job of workspaceJobs) {
    for (let jobMember of job.members) {
      usersHaveSchedules.push(jobMember.id);
    }
  }

  const workingUsers = leaderboard.filter(
    (x) =>
      x.user.active === 1 &&
      x.user.room_id !== null &&
      x.user.workspace_id === +(workspace_id as string) &&
      usersHaveSchedules.includes(x.user.id)
  );

  const workingUserCounts = workingUsers.length;

  return (
    <TitleEl title={`Working (${workingUserCounts})`}>
      <ParticipantsWithPopover participants={workingUsers.map((x) => x.user)} />
    </TitleEl>
  );
}
