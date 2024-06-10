export type WorkspaceRoomType = {
  avatar: null | string;
  background_image: null | string;
  created_at: string;
  id: number;
  is_active: boolean;
  is_locked: boolean;
  landing_spot: string;
  passcode: null | string;
  status: any;
  title: string;
  updated_at: null | string;
  workspace_id: number;
};

export type WorkspaceRoomJoinType = WorkspaceRoomType & {
  token: string;
};
