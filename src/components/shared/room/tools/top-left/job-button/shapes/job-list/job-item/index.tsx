"use client"
import { JobType } from "@/types/job"
import EditJobButton from "./edit"
import { limitChar } from "@/lib/utils"
import TimeOverShower from "./time-over-shower"
import JobStatus from "./job-status"
import JobActions from "./job-actions"

interface Props {
  item: JobType
  mutate?: () => void
}

const JobItem = ({ item, mutate }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 items-start w-full py-4 px-6 border border-grayscale-border rounded-2xl shadow-app-bar">
      <div className="flex w-full justify-between flex-row items-center gap-x-2">
        <span className="text-lg text-grayscale-paragraph whitespace-nowrap truncate">
          {item.title}
        </span>
        <div className="flex flex-row gap-x-3 items-center">
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
      <p className="text-grayscale-subtitle">
        {limitChar(item.description, 100)}
      </p>
      <div className="flex w-full items-center justify-between">
        <JobStatus status={item.status} />
        <TimeOverShower date={item.end_at} />
      </div>
    </div>
  )
}

export default JobItem
