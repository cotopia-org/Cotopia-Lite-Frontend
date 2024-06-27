import { ParticipantType } from "./participant";

export type DirectType = {
  id: number;
  is_private: 1 | 0;
  participants: ParticipantType[];
  title: string;
  token: string | null;
};
