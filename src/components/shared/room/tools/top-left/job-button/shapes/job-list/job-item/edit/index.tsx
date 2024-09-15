import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { FullModalBox } from "@/components/shared/modal-box"
import { Edit } from "lucide-react"
import { JobType } from "@/types/job"
import ManageJobContent from "../../../add-job/content"
import moment from "moment"

type Props = {
  job: JobType
  fetchAgain?: () => void
}
export default function EditJobButton({ job, fetchAgain }: Props) {
  let defaultValue = {
    title: job.title,
    description: job.description,
    end_at: Math.floor(moment(job.end_at).valueOf() / 1000),
    status: job.status,
  }

  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaTooltip title="Edit Job">
          <CotopiaIconButton
            onClick={open}
            className="text-black/60 hover:text-black w-8 h-8"
          >
            <Edit size={12} />
          </CotopiaIconButton>
        </CotopiaTooltip>
      )}
      className="w-[440px]"
    >
      {(open, close) => (
        <ManageJobContent
          onClose={close}
          defaultId={job.id}
          defaultValue={defaultValue}
          onCreated={() => {
            if (fetchAgain) fetchAgain()
            close()
          }}
          onDelete={() => {
            if (fetchAgain) fetchAgain()
            close()
          }}
        />
      )}
    </FullModalBox>
  )
}
