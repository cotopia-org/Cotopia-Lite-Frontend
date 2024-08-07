import JobActions from "./job-actions/menubar";
import { JobType } from "@/types/job";
import JobControllers from "./job-actions/controllers";
import JobInfo from "./job-info";

export default function JobCard({
  status,
  user,
  title,
  summary,
  date,
  roomName,
}: JobType) {
  return (
    <div
      className={`p-3 flex hover:bg-gray-100 transition-colors ${
        status === "doing" ? "border rounded-xl" : "border-b"
      }`}
    >
      <JobControllers status={status} />
      <div className="px-2 flex-auto">
        <div className="flex justify-between">
          <p className="text-xl font-medium">{title}</p>

          <JobActions />
        </div>
        <p className="text-gray-300 font-medium text-base mt-1">{summary}</p>
        <JobInfo
          date={date}
          status={status}
          avatar={user?.avatar?.url}
          username={user?.username}
          roomName={roomName}
        />
      </div>
    </div>
  );
}
