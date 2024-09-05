import { ChatItemType } from "./chat";
import { AttachmentFileType } from "./file";
import { WorkspaceRoomType } from "./room";
import { UserType } from "./user";

export type MessageType = {
  files: AttachmentFileType[];
  id: number;
  deleted_at: number | null;
  room?: WorkspaceRoomType;
  links: any[];
  text: string;
  user: UserType | null;
  room_id: number;
  mentions: any[];
  created_at: number;
  reply_to: ChatItemType | null;
  updated_at?: number | null;
  seen: boolean;
  nonce_id: string;
};
