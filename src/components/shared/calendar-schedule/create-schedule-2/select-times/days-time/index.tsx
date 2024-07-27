import { Accordion } from "@/components/ui/accordion";

import { useSchudleCreate } from "../..";
import DayTime from "./item";

export default function DaysTime() {
  const { options, setSchudule } = useSchudleCreate();

  return (
    <Accordion
      type='single'
      defaultValue={"" + options?.days?.[0]}
      collapsible
      className='w-full'
    >
      {options.days.map((day, key) => (
        <DayTime
          key={key}
          day={day}
          defaultValue={options?.daysTimes?.[day]}
          onChange={(time) =>
            setSchudule((prev) => ({
              ...prev,
              daysTimes: { ...prev.daysTimes, ["" + day]: time },
            }))
          }
        />
      ))}
    </Accordion>
  );
}
