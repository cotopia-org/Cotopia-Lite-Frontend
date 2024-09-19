import { ScheduleType } from "@/types/calendar";
import Time from "./time";

type Props = {
  times: ScheduleType["days"][0]["times"];
  onHide: () => void;
};

export default function TimeShower({ times, onHide }: Props) {
  if (times.length === 0) return;

  return times.map((x, index) => <Time key={index} time={x} onHide={onHide} />);
}
