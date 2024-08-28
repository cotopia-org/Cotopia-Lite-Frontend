import { MessageType } from "./message"

export type ChatItemType = MessageType & {
  isDelivered?: boolean
  is_edited?: boolean
  is_pinned?: boolean
}
