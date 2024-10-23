import { JobType } from "@/types/job"
import { ReactNode } from "react"
import JobItem from "./job-item"

interface Props {
  items: JobType[]
  mutate?: () => void
}

const Jobs = ({ items, mutate }: Props) => {
  let content: ReactNode | null = null

  content = (
    <div className="flex flex-col w-full gap-y-4 max-h-[350px] py-2 overflow-auto">
      {items.map((item, key) => {
        return <JobItem mutate={mutate} item={item} key={key + 1} />
      })}
    </div>
  )

  if (items.length === 0)
    content = (
      <span className="w-full font-medium text-center py-4">
        There is no job to show!
      </span>
    )

  return content
}

export default Jobs
