import CotopiaButton from "@/components/shared-ui/c-button";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type Props = {
  eventId: number;
  onDelete: () => void;
};
export default function DeleteEvent({ eventId, onDelete }: Props) {
  const { startLoading, stopLoading, isLoading } = useLoading();

  const handleDelete = () => {
    startLoading();
    axiosInstance
      .delete(`/schedules/${eventId}`)
      .then((res) => {
        toast.success("Event has been deleted");
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
      className='min-w-[160px] !border-red-500 !text-red-500'
      variant={"outline"}
      loading={isLoading}
    >
      {`Delete event`}
    </CotopiaButton>
  );
}
