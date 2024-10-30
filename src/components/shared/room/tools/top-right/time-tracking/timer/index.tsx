import { _BUS } from "@/app/const/bus";
import { convertMinutesToHHMMSS } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import useBus from "use-bus";

type Props = {
  initialSeconds: number;
  children: (time: string) => ReactNode;
  id?: string;
};

export default function Timer({ initialSeconds, children, id }: Props) {
  let timer: NodeJS.Timeout;

  const [seconds, setSeconds] = useState<number>(initialSeconds);
  useEffect(() => {
    if (initialSeconds !== undefined) setSeconds(initialSeconds);
  }, [initialSeconds]);

  const startTimer = () => {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  useEffect(() => {
    startTimer();

    // Cleanup the interval on component unmount
    return () => stopTimer();
  }, []);

  useBus(
    _BUS.stopWorkTimer,
    (evt) => {
      if (evt.id === id) stopTimer();
    },
    [id]
  );

  useBus(
    _BUS.startWorkTimer,
    (evt) => {
      if (evt.id === id) startTimer();
    },
    [id]
  );

  return <>{children(convertMinutesToHHMMSS((seconds ?? 0) / 60))}</>;
}
