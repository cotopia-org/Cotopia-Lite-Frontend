import { MessageType } from "./message";

export type ChatItemType = MessageType & {
  isDelivered?: boolean;
};
