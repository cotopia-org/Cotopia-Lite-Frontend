import { ChatItemType } from "./chat"
import { AttachmentFileType } from "./file"
import { WorkspaceRoomType } from "./room"
import { UserType } from "./user"

export type MessageType = {
  files: AttachmentFileType[]
  id: number
  room?: WorkspaceRoomType
  text: string
  user: UserType
  room_id?: number
  created_at: number
  reply_to: ChatItemType
  updated_at?: number
  seen: boolean
}
