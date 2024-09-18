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
      {/* <Participants
        participants={scheduled.map((s) => s.user)}
        customTitle={(x) => {
          const userSchedule = scheduled.find((s) => s.user.id === x.id);
          const days = userSchedule?.days.length ?? 0;
          let title = `${x.name}`;
          if (userSchedule && days)
            title = `${x.name} (in ${days} ${days < 2 ? "day" : "days"})`;
          return title;
        }}
      /> */}
    </TitleEl>
  );
}
