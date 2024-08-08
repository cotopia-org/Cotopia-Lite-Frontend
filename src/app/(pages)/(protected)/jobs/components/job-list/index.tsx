import { JobType } from "@/types/job";
import JobCard from "./job-card";

type Props = {
  title: string;
  jobList: JobType[];
};

function JobList({ title, jobList }: Props) {
  return (
    <>
      <h3 className="font-semibold text-xl text-neutral-400 my-4">{title}</h3>
      {jobList.map((job) => (
        <JobCard {...job} />
      ))}
    </>
  );
}

export default JobList;
