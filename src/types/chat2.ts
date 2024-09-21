import { MessageType } from "./message";

export type Chat2ItemType = MessageType & {
  is_delivered: boolean;
  is_rejected: boolean;
  is_pending: boolean;
};
