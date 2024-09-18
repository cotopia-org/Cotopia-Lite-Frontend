import TitleEl from "@/components/shared/title-el";
import React from "react";
import { useRoomContext } from "../../../room-context";
import SchedulesSummary from "@/components/shared/schedules-summary";
import moment from "moment";

export default function ScheduledUsers() {
  const today = moment();

  const { scheduled } = useRoomContext();

  const finalSchedules = scheduled.filter((x) =>
    x.days.find((a) => a.day === today.day())
  );
  const scheduledUsers = finalSchedules.length;

  return (
    <TitleEl title={`Scheduled (${scheduledUsers})`}>
      <SchedulesSummary schedules={finalSchedules} />
    </TitleEl>
  );
}
