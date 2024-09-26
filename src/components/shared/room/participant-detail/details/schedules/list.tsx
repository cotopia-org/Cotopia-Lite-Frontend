import { useApi } from "@/hooks/swr";
import React, { useMemo } from "react";
import { useUserDetail } from "..";
import { ScheduleType } from "@/types/calendar";
import FullLoading from "@/components/shared/full-loading";
import Schedules from "@/components/shared/schedules";
import { capitalizeWords, estimateTotalHoursBySchedules } from "@/lib/utils";
import BoxHolder from "@/components/shared/box-holder";

type Props = {
  justView?: boolean;
};

export default function SchedulesList({ justView = true }: Props) {
  const { user } = useUserDetail();

  const { data, isLoading } = useApi(`/users/${user?.id}/schedules`);
  const schedules: ScheduleType[] = data !== undefined ? data?.data : [];

  const totalHours = useMemo(() => {
    return estimateTotalHoursBySchedules(schedules);
  }, [schedules]);

  if (data === undefined || isLoading) return <FullLoading />;

  return (
    <>
      <BoxHolder
        title={`${capitalizeWords(
          user?.username ?? ""
        )}'s schedules (${totalHours}h) per week`}
        onClose={close}
      >
        <Schedules items={schedules} justView={justView} />
      </BoxHolder>
    </>
  );
}
