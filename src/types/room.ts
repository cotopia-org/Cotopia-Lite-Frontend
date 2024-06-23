import { RoomJoinType } from "./room-join";

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
};

export type WorkspaceRoomJoinType = RoomJoinType;
