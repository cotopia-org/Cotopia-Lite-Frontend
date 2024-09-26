import React, { useEffect, useMemo, useState } from "react"
import CotopiaPopover from "../c-popover"
import CotopiaInput, { CotopiaInputProps } from "../c-input"
import { Calendar } from "@/components/ui/calendar"
import moment from "moment"

type Props = {
  onChange?: (date: Date) => void
  defaultDate?: Date
  format?: string
  className?: string
  inputProps?: CotopiaInputProps
}

export default function CDateInput({
  onChange,
  defaultDate,
  format = "YYYY-MM-DD",
  className = "",
  inputProps,
}: Props) {
  const [date, setDate] = useState<Date>()
  useEffect(() => {
    if (defaultDate !== undefined) setDate(defaultDate)
  }, [defaultDate])
  const handleChange = (date: Date) => {
    setDate(date)
    if (onChange) onChange(date)
  }

  const formatedDate = useMemo(() => {
    if (date === undefined) return ""

    return moment(date).format(format)
  }, [date])

  return (
    <CotopiaPopover
      triggerClassName={className}
      trigger={<CotopiaInput {...inputProps} value={formatedDate} />}
    >
      <Calendar selected={date} onDayClick={handleChange} />
    </CotopiaPopover>
  )
}
