"use client";
import { JobType } from "@/types/job";
import EditJobButton from "./edit";
import { limitChar } from "@/lib/utils";
import TimeOverShower from "./time-over-shower";
import JobStatus from "./job-status";
import JobActions from "./job-actions";

interface Props {
  item: JobType;
  mutate?: () => void;
}

const JobItem = ({ item, mutate }: Props) => {
  return (
    <div className='flex flex-col gap-y-2 items-start w-full p-4 border rounded-md shadow-md'>
      <div className='flex w-full justify-between flex-row items-center gap-x-2'>
        <strong className='italic text-base text-black/[0.78]'>
          {item.title}
        </strong>
        <div className='flex flex-row items-center'>
          <JobActions
            job={item}
            onPause={mutate}
            onStart={mutate}
            onDelete={mutate}
            onDone={mutate}
          />
          <EditJobButton job={item} fetchAgain={mutate} />
        </div>
      </div>
      <p className='text-sm text-black/60'>
        {limitChar(item.description, 100)}
      </p>
      <div className='flex w-full items-center justify-between mt-2 '>
        <JobStatus status={item.status} />
        {/* <TimeOverShower date={item.end_at} /> */}
      </div>
    </div>
  );
};

export default JobItem;
