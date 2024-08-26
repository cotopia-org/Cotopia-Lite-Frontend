import { ChatItemType } from "./chat"
import { ParticipantType } from "./participant"

export type DirectType = {
  id: number
  is_private: 1 | 0
  last_message: ChatItemType
  participants: ParticipantType[]
  title: string
  token: string | null
}
