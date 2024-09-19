import React from "react";
import { useRoomContext } from "../../../room-context";
import SchedulesSummary from "@/components/shared/schedules-summary";
import moment from "moment";

export default function ScheduledUsers() {
  const today = moment();

  const { scheduled, workingUsers, onlineUsers } = useRoomContext();

  const onlineUserIds = onlineUsers.map((x) => x.id);

  const finalSchedules = scheduled
    .filter((x) => x.days.find((a) => a.day === today.day()))
    .filter((x) => !onlineUserIds.includes(x.user.id));

  return <SchedulesSummary schedules={finalSchedules} />;
}
