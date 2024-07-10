import { _BUS } from "@/app/const/bus";
import { useEffect } from "react";
import useBus from "use-bus";

type Props = {
  isDragging: boolean;
};
export default function VoiceAreaHearing({ isDragging }: Props) {
  let clss =
    "w-[0px] h-[0px] transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-green-500/20 rounded-full";
  if (isDragging) clss += ` !w-[500px] !h-[500px]`;

  useBus(_BUS.someoneStartTalking, (event) => {
    console.log("event", event);
  });

  return <div className={clss}></div>;
}
