import { CircleCheck } from "lucide-react";
import ActionItem from "./action-item";
import { useCallback } from "react";

function JobDone() {
  const handleDone = useCallback(() => {}, []);

  return (
    <ActionItem
      title="Mark as done"
      onClick={handleDone}
      icon={<CircleCheck size={16} />}
    />
  );
}

export default JobDone;
