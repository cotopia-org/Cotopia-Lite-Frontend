import { colors } from "@/app/const/vars"
import { TrashIcon } from "@/components/icons"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { JobType } from "@/types/job"
import { toast } from "sonner"

type Props = {
  job: JobType
  onDelete?: () => void
}
export default function DeleteJob({ job, onDelete }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading()

  const handleDelete = () => {
    startLoading()
    axiosInstance
      .delete(`/jobs/${job.id}`)
      .then((res) => {
        toast.success("Job has been deleted")
        if (onDelete) onDelete()
        stopLoading()
      })
      .catch(() => {
        stopLoading()
      })
  }

  return (
    <CotopiaIconButton
      onClick={handleDelete}
      disabled={isLoading}
      className="hover:text-black w-5 h-5"
    >
      <TrashIcon color={colors.error.default} size={16} />
    </CotopiaIconButton>
  )
}
