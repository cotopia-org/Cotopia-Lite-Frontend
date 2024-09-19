import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { FullModalBox } from "@/components/shared/modal-box";
import { Edit } from "lucide-react";
import { JobType } from "@/types/job";
import ManageJobContent from "../../../add-job/content";

type Props = {
  job: JobType;
  fetchAgain?: () => void;
};
export default function EditJobButton({ job, fetchAgain }: Props) {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaTooltip title='Edit Job'>
          <CotopiaIconButton
            onClick={open}
            className='text-black/60 hover:text-black w-8 h-8'
          >
            <Edit size={16} />
          </CotopiaIconButton>
        </CotopiaTooltip>
      )}
      className='w-[440px]'
    >
      {(open, close) => (
        <ManageJobContent
          onClose={close}
          defaultValue={job}
          onCreated={() => {
            if (fetchAgain) fetchAgain();
            close();
          }}
          onDelete={() => {
            if (fetchAgain) fetchAgain();
            close();
          }}
        />
      )}
    </FullModalBox>
  );
}
