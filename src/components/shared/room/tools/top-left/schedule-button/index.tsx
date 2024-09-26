import CotopiaButton from "@/components/shared-ui/c-button";
import PopupBox from "@/components/shared/popup-box";
import PopupBoxChild from "@/components/shared/popup-box/child";
import { CalendarDays } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import ShapesHandler from "./shapes/handler";
import { ScheduleType } from "@/types/calendar";
import moment from "moment";
import { estimateTotalHoursBySchedules, timeStringToMoment } from "@/lib/utils";

export default function ScheduleButton() {
  const [myTotalSchedules, setMyTotalSchedules] = useState<ScheduleType[]>([]);
  const onGetMySchedules = useCallback((schedules: ScheduleType[]) => {
    setMyTotalSchedules(schedules);
  }, []);

  const totalHours = useMemo(() => {
    return estimateTotalHoursBySchedules(myTotalSchedules);
  }, [myTotalSchedules]);

  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<CalendarDays />}
          className='bg-white hover:bg-white text-black rounded-xl'
        >
          Schedule
        </CotopiaButton>
      )}
      className='w-[551px]'
    >
      {(triggerPosition, open, close) => (
        <PopupBoxChild
          top={triggerPosition.top}
          left={triggerPosition.left}
          zIndex={triggerPosition.zIndex}
          onClose={close}
          title={`Schedule (${totalHours ?? 0}h) per week`}
          width={400}
        >
          <ShapesHandler onGetMySchedules={onGetMySchedules} />
        </PopupBoxChild>
      )}
    </PopupBox>
  );
}
