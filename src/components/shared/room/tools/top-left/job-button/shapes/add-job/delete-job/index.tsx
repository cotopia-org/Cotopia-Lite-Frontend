import CotopiaButton from "@/components/shared-ui/c-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onDelete?: () => void;
  jobId: number;
}

const DeleteJobHandler = ({ jobId, onDelete }: Props) => {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleDelete = () => {
    startLoading();
    axiosInstance
      .delete(`/jobs/${jobId}`)
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
    <CotopiaButton
      onClick={handleDelete}
      startIcon={<Trash size={16} />}
      className='w-full !border-red-500 !text-red-500'
      variant={"outline"}
      loading={isLoading}
    >
      {`Delete job`}
    </CotopiaButton>
  );
};

export default DeleteJobHandler;
