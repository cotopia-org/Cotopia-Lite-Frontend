import { Accordion } from "@/components/ui/accordion";

import { useSchudleCreate } from "../..";
import DayTime from "./item";
import TimeSelector from "@/components/shared/time-selector";

export default function DaysTime() {
  const { options, setSchudule } = useSchudleCreate();

  return (
    <div className='flex flex-row items-center gap-x-2'>
      <TimeSelector
        label='From'
        // defaultValue={time?.from}
        onTimeChange={(time) => {}}
      />
      <TimeSelector
        label='To'
        // defaultValue={time?.to}
        onTimeChange={(time) => {}}
      />
    </div>
  );
}
