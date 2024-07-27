import { useApi } from "@/hooks/swr";
import { convertMinutesToHHMMSS, urlWithQueryParams } from "@/lib/utils";
import React from "react";
import Timer from "../timer";

export default function TimeTrackingDetails() {
  const { data: monthData, isLoading: monthIsLoading } = useApi(
    urlWithQueryParams(`/users/activities`, { period: "currentMonth" })
  );

  const { data: yesterdayData, isLoading: yesterdayIsLoading } = useApi(
    urlWithQueryParams(`/users/activities`, { period: "yesterday" })
  );

  const monthMinutes = monthData !== undefined ? monthData?.data : 0;
  const yesterdayMinutes =
    yesterdayData !== undefined ? yesterdayData?.data : 0;

  return (
    <div className='flex flex-col gap-y-4 w-[220px]'>
      {[
        { label: "Monthly", value: monthMinutes, timer: true },
        { label: "Yesterday", value: yesterdayMinutes },
      ].map((item, key) => (
        <div className='flex flex-row items-center justify-between' key={key}>
          <strong>{item.label}</strong>
          <span>
            {item.timer ? (
              <Timer initialSeconds={item.value * 60}>{(time) => time}</Timer>
            ) : (
              convertMinutesToHHMMSS(item.value)
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
