import { colors } from "@/app/const/vars"
import { PlayCircleIcon } from "@/components/icons"
import CotopiaIconButton from "@/components/shared-ui/c-icon-button"
import useLoading from "@/hooks/use-loading"
import axiosInstance from "@/lib/axios"
import { JobType } from "@/types/job"
import { toast } from "sonner"

type Props = {
  job: JobType
  onStart?: () => void
}
export default function PlayJob({ job, onStart }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading()

  const handlePlay = () => {
    startLoading()
    axiosInstance
      .put(`/jobs/${job.id}`, { status: "in_progress" })
      .then((res) => {
        toast.success("Job has been started")
        stopLoading()
        if (onStart) onStart()
      })
      .catch(() => {
        stopLoading()
      })
  }

  return (
    <CotopiaIconButton
      onClick={handlePlay}
      disabled={isLoading}
      className="text-black/60 hover:text-black w-5 h-5"
    >
      <PlayCircleIcon color={colors.primary.body} size={16} />
    </CotopiaIconButton>
  )
}
