import React, { useState } from "react";
import { SchuldeOptions, useSchudleCreate } from "../..";
import { Calendar } from "@/components/ui/calendar";
import StepActions from "../components/actions";
import { DateRange } from "react-day-picker";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import moment from "moment";

type Props = {
  options: SchuldeOptions;
};

export default function SelectCustom({ options }: Props) {
  const { calendar } = useSchudleCreate();

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleCreate = () => {
    if (date === undefined) {
      toast.error("Please select date at first!");
      return;
    }

    if (!date.to) {
      toast.error("Please also select end date!");
      return;
    }

    const starts_at = moment(date.from).format("YYYY-MM-DD HH:mm:ss");
    const ends_at = moment(date.to).format("YYYY-MM-DD HH:mm:ss");

    startLoading();
    axiosInstance
      .post(`/schedules`, {
        calendar_id: calendar.id,
        availability_type: options.availability,
        starts_at,
        ends_at,
        // recurrence_pattern: options.pattern,
      })
      .then((res) => {
        toast.success("You've drown up a schudle!");
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <Calendar mode='range' selected={date} onSelect={setDate} />
      <StepActions
        onSubmit={handleCreate}
        isSubmitLoading={isLoading}
        isSubmitDisabled={date === undefined}
      />
    </div>
  );
}
