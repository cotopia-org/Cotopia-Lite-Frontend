import { UserType } from "./user";

export type AttachmentFileType = {
  id: number;
  path: string;
  url: string;
  mime_type: string;
  owner: UserType;
};
