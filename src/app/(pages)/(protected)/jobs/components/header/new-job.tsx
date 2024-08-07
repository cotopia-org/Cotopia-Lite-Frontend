import CotopiaButton from "@/components/shared-ui/c-button";
import { Plus } from "lucide-react";
import JobDetails from "../job-details";
import CRawDialog from "@/components/shared-ui/c-dialog/raw-dialog";

function NewJob() {
  return (
    <CRawDialog
      dialogContentCss="!w-[80vw] !max-w-[1180px] min-h-[70vh] max-h-[90vh] overflow-y-auto p-0"
      trigger={(open) => (
        <CotopiaButton
          // onClick={() => setIsModalOpen(true)}
          className="flex bg-[#1B5BFF]"
        >
          <span>
            <Plus size={20} />
          </span>
          <span>Add a Job</span>
        </CotopiaButton>
      )}
    >
      {(close) => <JobDetails title="new Job" handleClose={close} />}
    </CRawDialog>
  );
}

export default NewJob;
