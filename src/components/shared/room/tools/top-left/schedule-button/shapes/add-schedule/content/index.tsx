"use client"

import { useEffect, useState } from "react"
import Day from "./day"
import CotopiaButton from "@/components/shared-ui/c-button"
import { Save } from "lucide-react"
import useLoading from "@/hooks/use-loading"
import TitleEl from "@/components/shared/title-el"
import AvailabilityType from "./availability"
import { AvailabiltyType } from "@/types/calendar"
import axiosInstance from "@/lib/axios"
import { toast } from "sonner"
import DeleteEvent from "../delete-event"
import CotopiaSwitch from "@/components/shared-ui/c-switch"
import CDateInput from "@/components/shared-ui/c-date-input"
import moment from "moment"
import { useRoomContext } from "@/components/shared/room/room-context"

export type ScheduleDayType = {
  index: number
  times: { from: string; to: string }[]
  availability_type: AvailabiltyType
  selected: boolean
}

//Todo - Refactor defaultId and defaultValue to schedule object
type Props = {
  onClose: () => void
  defaultId?: number
  defaultValue?: {
    availability_type: AvailabiltyType
    days: { [key: number]: ScheduleDayType }
    is_recurrence?: boolean
    recurrence_start?: string
    recurrence_end?: string
  }
  onDelete?: () => void
  onCreated?: () => void
}

export default function AddScheduleContent({
  onClose,
  defaultId,
  defaultValue,
  onDelete,
  onCreated,
}: Props) {
  const { workspace_id } = useRoomContext()

  const isEdit = defaultValue !== undefined && defaultId !== undefined

  const [recurrenceDates, setRecurrenceDates] = useState<{
    start_at?: string
    ends_at?: string
  }>()

  const [isRecurrence, setIsRecurrence] = useState<boolean>(false)

  const [availability, setAvailability] = useState<AvailabiltyType>(
    AvailabiltyType.Voice
  )

  const [daysValue, setDaysValue] = useState<{
    [key: number]: ScheduleDayType
  }>()

  useEffect(() => {
    if (defaultValue !== undefined) {
      const { availability_type, days } = defaultValue

      setAvailability(availability_type)
      setDaysValue(days)

      setIsRecurrence(defaultValue?.is_recurrence ?? false)
      if (defaultValue?.recurrence_end)
        setRecurrenceDates((prev) => ({
          ...prev,
          ends_at: defaultValue?.recurrence_end,
        }))
      if (defaultValue?.recurrence_start)
        setRecurrenceDates((prev) => ({
          ...prev,
          start_at: defaultValue?.recurrence_start,
        }))
    }
  }, [defaultValue])

  const days = Array.from(Array(7).keys())

  useEffect(() => {
    if (daysValue !== undefined) return
  }, [daysValue])

  const handleChangeDay = (index: number, day: ScheduleDayType) => {
    setDaysValue((prev) => {
      const prevDays: any = prev !== undefined ? prev : {}

      prevDays[index] = day

      return prevDays
    })
  }

  const { startLoading, stopLoading, isLoading } = useLoading()
  const handleSubmitEvent = () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    if (daysValue === undefined) return

    startLoading()
    let payload: { [key: string]: any } = {
      is_recurrence: isRecurrence,
      timezone: userTimeZone,
      availability_type: availability,
      workspace_id,
    }

    if (isRecurrence) {
      if (recurrenceDates?.start_at)
        payload["recurrence_start_at"] = recurrenceDates?.start_at
      if (recurrenceDates?.ends_at)
        payload["recurrence_end_at"] = recurrenceDates?.ends_at
    }

    const daysArray = Object.keys(daysValue)
      .map((x) => ({ day: daysValue[+x], dayIndex: x }))
      .filter((x) => x.day.selected)
      .map((x) => ({
        day: +x.dayIndex,
        times: x.day.times.map((a) => ({
          start: a.from,
          end: a.to,
        })),
      }))

    payload["days"] = daysArray

    axiosInstance({
      url: isEdit ? `/schedules/${defaultId}` : `/schedules`,
      method: isEdit ? "PUT" : "POST",
      data: payload,
    })
      .then((res) => {
        toast.success(
          isEdit ? "Event has been updated" : "Event has been created"
        )
        if (!isEdit) {
          if (onCreated) onCreated()
        }
        stopLoading()
      })
      .catch(() => {
        stopLoading()
      })
  }

  return (
    <div className="flex flex-col gap-y-8">
      <TitleEl title="Availability Type">
        <AvailabilityType value={availability} onChange={setAvailability} />
      </TitleEl>
      <TitleEl title="Days">
        <div className="flex flex-col gap-y-6">
          {days.map((dayNumber, index) => {
            const day = daysValue?.[dayNumber]
            return (
              <div className="day" key={index}>
                <Day
                  index={index}
                  day={day}
                  onChange={(dayValue) => handleChangeDay(index, dayValue)}
                />
                <hr className="mt-6" />
              </div>
            )
          })}
        </div>
      </TitleEl>
      <TitleEl title="Times" className="flex flex-col gap-y-4">
        <CotopiaSwitch
          label="Is this event recurrence?"
          checked={isRecurrence}
          onCheckedChange={setIsRecurrence}
        />
        {isRecurrence && (
          <>
            <CDateInput
              inputProps={{
                label: "Start at",
              }}
              defaultDate={
                recurrenceDates?.start_at
                  ? moment(recurrenceDates.start_at).toDate()
                  : undefined
              }
              onChange={(date) =>
                setRecurrenceDates((prev) => ({
                  ...prev,
                  start_at: moment(date).format("YYYY-MM-DD HH:mm:ss"),
                }))
              }
            />
            <CDateInput
              inputProps={{
                label: "Ends at",
              }}
              defaultDate={
                recurrenceDates?.ends_at
                  ? moment(recurrenceDates.ends_at).toDate()
                  : undefined
              }
              onChange={(date) =>
                setRecurrenceDates((prev) => ({
                  ...prev,
                  ends_at: moment(date).format("YYYY-MM-DD HH:mm:ss"),
                }))
              }
            />
          </>
        )}
      </TitleEl>
      <div className="flex flex-row justify-end gap-x-2">
        <CotopiaButton
          variant={"outline"}
          className="min-w-[120px]"
          onClick={onClose}
        >
          Close
        </CotopiaButton>
        {isEdit && (
          <DeleteEvent
            eventId={defaultId}
            onDelete={() => onDelete && onDelete()}
          />
        )}
        <CotopiaButton
          onClick={handleSubmitEvent}
          startIcon={<Save size={16} />}
          className="min-w-[160px]"
          loading={isLoading}
          disabled={daysValue === undefined}
        >
          {`${isEdit ? "Update" : "Create"} Event`}
        </CotopiaButton>
      </div>
    </div>
  )
}
