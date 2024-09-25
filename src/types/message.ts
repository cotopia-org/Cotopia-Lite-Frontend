import { ChatItemType } from "./chat";
import { AttachmentFileType } from "./file";
import { WorkspaceRoomType } from "./room";
import { UserMinimalType, UserType } from "./user";

export type MessageType = {
  files: AttachmentFileType[];
  id?: number;
  deleted_at: number | null;
  room?: WorkspaceRoomType;
  links: any[];
  text: string;
  user: UserMinimalType;
  room_id: number;
  mentions: any[];
  created_at: number;
  reply_to: ChatItemType | null;
  updated_at?: number | null;
  seen: boolean;
  nonce_id: number | null;
};
