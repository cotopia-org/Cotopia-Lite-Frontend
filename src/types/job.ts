export type JobStatuType = "in_progress" | "paused" | "completed"

export type JobType = {
  created_at: string
  description: string
  end_at: string
  id: number
  status: JobStatuType
  title: "first job"
  updated_at: "2024-09-15T04:10:15.000000Z"
  workspace_id: 1
}
