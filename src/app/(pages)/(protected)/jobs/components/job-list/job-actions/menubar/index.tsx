import CotopiaPopover from "@/components/shared-ui/c-popover";
import { Ellipsis } from "lucide-react";
import React from "react";
import DuplicateJob from "./duplicate";
import JobDone from "./done";
import DeleteJob from "./delete";

function JobActions() {
  return (
    <CotopiaPopover
      contentClassName="w-36 py-3 px-4"
      trigger={<Ellipsis size={16} />}
    >
      <DuplicateJob />
      <JobDone />
      <DeleteJob />
    </CotopiaPopover>
  );
}

export default JobActions;
