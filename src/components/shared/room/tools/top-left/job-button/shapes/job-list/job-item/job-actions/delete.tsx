import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { JobType } from "@/types/job";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type Props = {
  job: JobType;
  onDelete?: () => void;
};
export default function DeleteJob({ job, onDelete }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleDelete = () => {
    startLoading();
    axiosInstance
      .delete(`/jobs/${job.id}`)
      .then((res) => {
        toast.success("Job has been deleted");
        if (onDelete) onDelete();
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  };

  return (
    <CotopiaIconButton
      onClick={handleDelete}
      disabled={isLoading}
      className='text-black/60 hover:text-black w-8 h-8'
    >
      <Trash className='text-red-600' size={16} />
    </CotopiaIconButton>
  );
}
