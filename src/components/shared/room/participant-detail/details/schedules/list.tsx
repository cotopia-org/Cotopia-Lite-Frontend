import { useApi } from "@/hooks/swr";
import React from "react";
import { useUserDetail } from "..";
import { ScheduleType } from "@/types/calendar";
import FullLoading from "@/components/shared/full-loading";
import Schedules from "@/components/shared/schedules";

type Props = {
  justView?: boolean;
};

export default function SchedulesList({ justView = true }: Props) {
  const { user } = useUserDetail();

  const { data, isLoading } = useApi(`/users/${user?.id}/schedules`);
  const schedules: ScheduleType[] = data !== undefined ? data?.data : [];

  if (data === undefined || isLoading) return <FullLoading />;

  return <Schedules items={schedules} justView={justView} />;
}
