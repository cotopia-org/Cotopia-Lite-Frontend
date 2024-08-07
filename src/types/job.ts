import { UserType } from "./user";

export type JobType = {
  title: string;
  summary: string;
  date: Date;
  status: "default" | "paused" | "doing";
  user: UserType;
  roomName: string;
};
