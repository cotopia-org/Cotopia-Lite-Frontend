import { AttachmentFileType } from "./file";

export type UserType = {
  active: null | 0 | 1;
  avatar: AttachmentFileType | null;
  bio: null | string;
  coordinates: null | string;
  email: string;
  id: number;
  name: string;
  room_id: null | number;
  workspace_id: null | number;
  screenshare_coordinates: null | string;
  screenshare_size: null | string;
  status: null | string;
  username: string;
  video_coordinates: null | string;
  video_size: null | string;
  video_status: null | string;
  voice_status: null | string;
};

export type UserMinimalType = {
  avatar: null | AttachmentFileType;
  id: number;
  name: string;
  username: string;
  coordinates: string | null;
  video_coordinates: null | string;
  video_size: null | string;
  video_status: null | string;
  voice_status: null | string;
  screenshare_coordinates: null | string;
  screenshare_size: null | string;
};

export type WorkspaceUserType = {
  avatar: AttachmentFileType;
  coordinates: string;
  id: number;
  last_login: string;
  name: string;
  status: string;
  username: string;
  verified: boolean;
  room_id: number | null;
};
