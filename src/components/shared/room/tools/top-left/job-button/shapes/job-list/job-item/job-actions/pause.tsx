import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { JobType } from "@/types/job";
import { PauseCircle } from "lucide-react";
import { toast } from "sonner";

type Props = {
  job: JobType;
  onPause?: () => void;
};
export default function PauseJob({ job, onPause }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handlePaused = () => {
    startLoading();
    axiosInstance
      .put(`/jobs/${job.id}`, { status: "paused" })
      .then((res) => {
        toast.success("Job has been stopped");
        stopLoading();
        if (onPause) onPause();
      })
      .catch(() => {
        stopLoading();
      });
  };

  return (
    <CotopiaIconButton
      onClick={handlePaused}
      disabled={isLoading}
      className='text-black/60 hover:text-black w-8 h-8'
    >
      <PauseCircle className='text-yellow-600' size={16} />
    </CotopiaIconButton>
  );
}
