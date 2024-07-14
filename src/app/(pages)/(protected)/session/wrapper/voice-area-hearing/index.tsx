import { _BUS } from "@/app/const/bus";
import { __VARS } from "@/app/const/vars";

type Props = {
  isDragging: boolean;
};
export default function VoiceAreaHearing({ isDragging }: Props) {
  const diameter = __VARS.voiceAreaRadius * 2;

  let clss =
    "w-[0px] h-[0px] transition-all absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-green-500/20 rounded-full";

  let style = {};
  if (isDragging) style = { width: diameter, height: diameter };

  return <div className={clss} style={style}></div>;
}
