import CotopiaButton from "@/components/shared-ui/c-button";
import { useRoomContext } from "@/components/shared/room/room-context";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { CalendarType } from "@/types/calendar";
import { Calendar, Plus } from "lucide-react";

type Props = {
  onCreate: (item: CalendarType) => void;
};

export default function CreateCalendar({ onCreate }: Props) {
  const { workspace_id } = useRoomContext();

  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleCreateCalendar = () => {
    startLoading();
    axiosInstance
      .post(`/calendars`, {
        workspace_id,
      })
      .then((res) => {
        if (onCreate) onCreate(res.data);
      })
      .catch((err) => {
        stopLoading();
      });
  };

  return (
    <div className='flex flex-col gap-y-4 items-center py-8'>
      <Calendar />
      <strong>You don't have any calendar</strong>
      <CotopiaButton
        loading={isLoading}
        onClick={handleCreateCalendar}
        className='!px-6'
        variant={"outline"}
        endIcon={<Plus />}
      >
        Create one
      </CotopiaButton>
    </div>
  );
}
