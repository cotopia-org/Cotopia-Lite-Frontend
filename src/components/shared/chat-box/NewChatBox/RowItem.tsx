"use client"
import { ChatItemType } from "@/types/chat"
import ChatItem from "../chat-item"
import { memo } from "react"
import { UserMinimalType } from "@/types/user"

const RowItem = ({
  item,
  observerId,
  onFetchMessages,
}: {
  item: ChatItemType
  observerId?: number
  user?: UserMinimalType
  onFetchMessages?: () => Promise<void>
}) => {
  return (
    <ChatItem
      onFlagSelect={onFetchMessages}
      item={item}
      observer_user_id={observerId}
    />
  )
}

export default memo(RowItem)
