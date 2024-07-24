export type CalendarType = {
  created_at: string;
  description: null | string;
  id: number;
  owner_id: number;
  title: null | string;
  updated_at: string;
  workspace_id: number;
};

export enum RecurrencePattern {
  "Daily" = 1,
  "Weekly" = 2,
  "Monthly" = 3,
  "Custom" = 4,
}

export enum RecurrenceDays {
  "Monday" = 0,
  "Tuesday" = 1,
  "Wednesday" = 2,
  "Thursday" = 3,
  "Friday" = 4,
  "Saturday" = 5,
  "Sunday" = 6,
}

export enum AvailabiltyType {
  "Video" = 0,
  "Voice" = 1,
  "Text" = 2,
}
