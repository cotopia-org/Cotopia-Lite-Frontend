import { ScheduleType } from "@/types/calendar"
import Card from "./card"
import { useEffect, useState } from "react"
import TitleEl from "../title-el"
import * as emoji from "node-emoji"

type Props = {
  schedules: ScheduleType[]
}
export default function SchedulesSummary({ schedules }: Props) {
  const [localSchedules, setLocalSchedules] = useState<ScheduleType[]>([])
  useEffect(() => {
    if (schedules !== undefined) setLocalSchedules(schedules)
  }, [schedules])

  const handleRemoveSchedule = (schedule: ScheduleType) => {
    setLocalSchedules((prev) => prev.filter((x) => x.id !== schedule.id))
  }

  if (localSchedules.length === 0) return

  return (
    <TitleEl
      title={`Scheduled (${localSchedules.length}) ${emoji.get("scream")}`}
    >
      <div className="flex flex-col gap-y-2">
        {localSchedules.map((sch) => (
          <Card
            key={sch.id}
            schedule={sch}
            onHide={() => handleRemoveSchedule(sch)}
          />
        ))}
      </div>
    </TitleEl>
  )
}
