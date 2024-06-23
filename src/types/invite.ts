import { WorkspaceRoomType } from "./room";
import { UserType } from "./user";
import { WorkspaceType } from "./workspace";

export type InviteType = {
  code: string;
  id: number;
  owner: UserType;
  room: null | WorkspaceRoomType;
  status: "pending" | "joined" | "declined";
  user: UserType;
  workspace: WorkspaceType;
};
