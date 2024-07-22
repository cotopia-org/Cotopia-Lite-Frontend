import CotopiaButton from "@/components/shared-ui/c-button";

import { Clock } from "lucide-react";

import { _BUS } from "@/app/const/bus";
import useLoading from "@/hooks/use-loading";
import axiosInstance, { FetchDataType } from "@/lib/axios";
import { useEffect, useState } from "react";
import { convertMinutesToHHMMSS, urlWithQueryParams } from "@/lib/utils";

let timer: NodeJS.Timeout;

export default function TimeTrackingButtonTool() {
  const [seconds, setSeconds] = useState<undefined | number>();

  const { startLoading, stopLoading, isLoading } = useLoading();
  const getActivityTime = () => {
    startLoading();
    axiosInstance
      .get(urlWithQueryParams(`/users/activities`, { today: true }))
      .then((res) => {
        const mins = res.data.data;
        setSeconds(mins * 60);
        stopLoading();
      })
      .catch((err) => {
        stopLoading();
      });
  };
  useEffect(() => {
    getActivityTime();
  }, []);

  useEffect(() => {
    if (seconds === undefined) return;

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      setSeconds((prev) => (prev as number) + 1);
    }, 1000);
  }, [seconds]);

  return (
    <>
      <CotopiaButton
        loading={isLoading}
        className='relative bg-white hover:bg-white text-black rounded-xl !pr-6'
        startIcon={<Clock />}
      >
        <div className='absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse'></div>
        {seconds && convertMinutesToHHMMSS(seconds / 60)}
      </CotopiaButton>
    </>
  );
}
