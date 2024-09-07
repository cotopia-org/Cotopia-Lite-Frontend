import { MessageType } from "./message"

export type ChatItemType = MessageType & {
  isDelivered?: boolean
  is_edited?: boolean
  channel?: string
  is_pinned?: boolean
  is_direct?: boolean
}
