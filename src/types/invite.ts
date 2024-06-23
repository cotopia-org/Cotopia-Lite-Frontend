import { AttachmentFileType } from "./file";
import { WorkspaceRoomType } from "./room";
import { WorkspaceType } from "./workspace";

export type InviteType = {
  code: string;
  id: number;
  owner: {
    avatar: null | AttachmentFileType;
    id: number;
    name: null | string;
    username: string;
  };
  room: null | WorkspaceRoomType;
  status: "pending" | "joined" | "declined";
  user: {
    avatar: null | AttachmentFileType;
    id: number;
    name: string;
    username: string;
  };
  workspace: WorkspaceType;
};
