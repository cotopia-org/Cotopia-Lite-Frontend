import { UserMinimalType, WorkspaceUserType } from "./user"

export enum AvailabiltyType {
  "Video" = 0,
  "Voice" = 1,
  "Text" = 2,
}

export type ScheduleType = {
  availability_type: AvailabiltyType
  days: { day: number; times: { start: string; end: string }[] }[]
  end_time: string
  id: number
  is_recurrence: 0 | 1
  recurrence_end_at: null | string
  recurrence_start_at: string
  start_time: string
  timezone: string
  user: WorkspaceUserType
  workspace_id: number
}
