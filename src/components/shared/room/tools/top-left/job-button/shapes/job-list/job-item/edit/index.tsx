import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import CotopiaTooltip from "@/components/shared-ui/c-tooltip"
import { FullModalBox } from "@/components/shared/modal-box"
import { Edit } from "lucide-react"
import { JobType } from "@/types/job"
import ManageJobContent from "../../../add-job/content"
import { EditIcon } from "@/components/icons"
import { colors } from "@/app/const/vars"

type Props = {
  job: JobType
  fetchAgain?: () => void
}
export default function EditJobButton({ job, fetchAgain }: Props) {
  return (
    <FullModalBox
      trigger={(open) => (
        <CotopiaTooltip title="Edit Job">
          <CotopiaIconButton
            onClick={open}
            className="hover:text-black w-5 h-5"
          >
            <EditIcon color={colors.grayscale.grayscaleSubtitle} size={16} />
          </CotopiaIconButton>
        </CotopiaTooltip>
      )}
      className="w-[440px]"
    >
      {(open, close) => (
        <ManageJobContent
          onClose={close}
          defaultValue={job}
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
