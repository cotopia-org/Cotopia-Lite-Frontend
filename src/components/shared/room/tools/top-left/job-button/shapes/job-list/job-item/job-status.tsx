import { JobStatuType } from "@/types/job";
import type { StatusBoxVariant } from "@/components/shared/status-box";
import StatusBox from "@/components/shared/status-box";
interface Props {
  status: JobStatuType;
}

const JobStatus = ({ status }: Props) => {
  let statusVariant: StatusBoxVariant = "default";

  let label = "";

  switch (status) {
    case "in_progress":
      label = "In progress";
      statusVariant = "info";
      break;
    case "paused":
      label = "Paused";
      statusVariant = "warning";
      break;
    case "completed":
      label = "Completed";
      statusVariant = "success";
      break;

    default:
      break;
  }

  return <StatusBox variant={statusVariant} label={label} />;
};

export default JobStatus;
