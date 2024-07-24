import { convertMinutesToHHMMSS } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  initialSeconds: number;
  children: (time: string) => ReactNode;
};

export default function Timer({ initialSeconds, children }: Props) {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  useEffect(() => {
    if (initialSeconds !== undefined) setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return <>{children(convertMinutesToHHMMSS((seconds ?? 0) / 60))}</>;
}
