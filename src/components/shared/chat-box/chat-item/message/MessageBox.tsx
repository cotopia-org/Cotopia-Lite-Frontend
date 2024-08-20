"use client"

import { ChatItemType } from "@/types/chat"
import Avatar from "../avatar"
import { getUserFullname } from "@/lib/utils"
import Username from "../username"
import Message from "."
import Time from "../time"

interface Props {
  isAvatarVisible: boolean
  item: ChatItemType
}

const MessageBox = ({ item, isAvatarVisible }: Props) => {
  return (
    <div
      data-id={`${item.id}`}
      className="chat-item relative flex flex-row items-start gap-x-2 select-text"
    >
      {!isAvatarVisible && (
        <Avatar
          src={item?.user?.avatar?.url}
          title={getUserFullname(item?.user)?.[0]}
        />
      )}
      <div className="message-box relative flex flex-row  items-center gap-x-4 p-2 pb-4 rounded-lg bg-black/5 w-[200px] max-w-full">
        <div className="flex flex-col gap-y-1 w-full">
          <div
            className="flex flex-row items-center gap-x-1"
            style={{ overflowWrap: "anywhere" }}
          >
            <Username username={item.user.username} />
          </div>
          <Message item={item} />
        </div>
        <div className="absolute bottom-1 right-2">
          <Time time={item.created_at} />
        </div>
      </div>
    </div>
  )
}

export default MessageBox
