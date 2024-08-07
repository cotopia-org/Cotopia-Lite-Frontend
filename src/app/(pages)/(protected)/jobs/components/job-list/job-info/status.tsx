import { PauseCircle } from "lucide-react";
import Badge from "../../badge";

function Status() {
  return (
    <Badge
      title="paused"
      icon={<PauseCircle size={16} color="#E6CF00" />}
      className="bg-[#FFFDEB] text-[#E6CF00] border border-[#E6CF00]"
    />
  );
}

export default Status;
