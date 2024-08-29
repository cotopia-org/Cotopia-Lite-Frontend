import { UserType } from "./user";

export type LeaderboardType = {
  activities: any[];
  count: number;
  data: any[];
  sum_hours: string;
  sum_minutes: number;
  user: UserType;
};
