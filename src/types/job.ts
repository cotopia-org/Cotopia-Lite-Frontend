import { UserMinimalType } from "./user";

export type JobStatuType = "in_progress" | "paused" | "completed" | "started";

export type JobType = {
  created_at: string;
  description: string;
  estimate: number;
  id: number;
  status: JobStatuType;
  title: string;
  updated_at: string;
  workspace_id: number;
  members: UserMinimalType[];
  total_hours: string;
};
