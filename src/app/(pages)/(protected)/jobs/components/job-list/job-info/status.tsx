import { PauseCircle } from "lucide-react";
import Badge from "../../badge";

function Status() {
  return (
    <Badge
      title="paused"
      icon={<PauseCircle size={16} color="#E6CF00" />}
      className="bg-yellow-50 text-yellow-400 border border-yellow-400"
    />
  );
}

export default Status;
