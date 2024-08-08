import { AttachmentFileType } from "./file";
import { RoomJoinType } from "./room-join";
import { UserMinimalType } from "./user";

export type WorkspaceRoomType = {
  active: 1 | 0;
  created_at: null | string;
  id: number;
  is_private: 0 | 1;
  landing_spot: null | string;
  password: null | string;
  status: null | string;
  title: string;
  updated_at: null | string;
  user_id: number;
  workspace_id: number;
  participants: UserMinimalType[];
  background: AttachmentFileType | null;
  unseens: number;
};

export type WorkspaceRoomShortType = {
  background: AttachmentFileType;
  id: number;
  is_private: 0 | 1;
  logo: null | AttachmentFileType;
  title: string;
  unseens: number;
  participants: UserMinimalType[];
};

export type WorkspaceRoomJoinType = RoomJoinType;
