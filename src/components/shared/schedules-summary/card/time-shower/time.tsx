import { timeStringToMoment } from "@/lib/utils";
import { ScheduleType } from "@/types/calendar";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  time: ScheduleType["days"][0]["times"][0];
  onHide: () => void;
};
export default function Time({ time, onHide }: Props) {
  const [isShow, setIsShow] = useState(true);

  const startMoment = timeStringToMoment(time.start);
  const endMoment = timeStringToMoment(time.end);

  useEffect(() => {
    const now = moment();

    if (
      !(
        now.diff(startMoment, "minutes") > 0 &&
        now.diff(endMoment, "minutes") < 0
      )
    ) {
      setIsShow(false);
      if (onHide) onHide();
    }
  }, [startMoment, endMoment, onHide]);

  if (!isShow) return;

  return (
    <span className='text-sm text-black/60'>{`${time.start} - ${time.end}`}</span>
  );
}
