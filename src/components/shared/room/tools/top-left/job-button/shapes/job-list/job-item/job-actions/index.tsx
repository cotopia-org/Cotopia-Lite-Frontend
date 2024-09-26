import { JobType } from "@/types/job";
import PlayJob from "./play";
import PauseJob from "./pause";
import DeleteJob from "./delete";
import DoneJob from "./done";

type Props = {
  job: JobType;
  onDelete?: () => void;
  onStart?: () => void;
  onPause?: () => void;
  onDone?: () => void;
};
export default function JobActions({
  job,
  onPause,
  onDelete,
  onStart,
  onDone,
}: Props) {
  return (
    <div className='flex flex-row items-center'>
      {job.status === "paused" && <PlayJob onStart={onStart} job={job} />}
      {job.status === "in_progress" && <PauseJob onPause={onPause} job={job} />}
      <DeleteJob job={job} onDelete={onDelete} />
      <DoneJob job={job} onDone={onDone} />
    </div>
  );
}
