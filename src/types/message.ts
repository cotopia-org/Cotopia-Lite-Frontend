import { AttachmentFileType } from "./file";
import { WorkspaceRoomType } from "./room";
import { UserType } from "./user";

export type MessageType = {
  files: AttachmentFileType[];
  id: number;
  room: WorkspaceRoomType;
  text: string;
  user: UserType;
  created_at: number;
  updated_at?: number;
};
