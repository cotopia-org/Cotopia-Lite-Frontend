"use client"

import { ChatItemType } from "@/types/chat"
import Avatar from "../avatar"
import { getUserFullname } from "@/lib/utils"
import Username from "../username"
import Message from "."
import Time from "../time"
import { CheckCheck } from "lucide-react"
import colors from "tailwindcss/colors"
import { ReactNode, forwardRef } from "react"

interface Props {
  isMine: boolean
  item: ChatItemType
  beforeNode?: ReactNode
}

const MessageBox = forwardRef(
  ({ item, isMine, beforeNode }: Props, ref: any) => {
    const isMessageEdited = !!item.is_edited
    const isMessageSeen = !!item.seen

    let footerClss = "flex w-full justify-end items-center"

    let seenModeNode = null
    let editLable = null

    if (isMessageEdited) {
      footerClss += " !justify-between"
      editLable = <span className="text-xs text-black/50">Edited</span>
    }

    if (isMine) {
      seenModeNode = (
        <CheckCheck
          color={isMessageSeen ? colors?.blue[500] : colors?.gray[400]}
          size={14}
        />
      )
    }

    return (
      <div
        ref={ref}
        data-id={`${item.id}`}
        className="chat-item overflow-hidden relative flex flex-row my-2 items-start gap-x-2 select-text"
      >
        {!isMine && (
          <Avatar
            src={item?.user?.avatar?.url}
            title={getUserFullname(item?.user)?.[0]}
          />
        )}
        <div className="message-box relative flex flex-row items-center gap-x-4 p-2  rounded-lg bg-black/5 w-[200px] max-w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <div
              className="flex flex-row items-center gap-x-1"
              style={{ overflowWrap: "anywhere" }}
            >
              <Username username={item.user.username} />
            </div>
            {beforeNode && beforeNode}
            <Message isMine={isMine} item={item} />
            <div className={footerClss}>
              {editLable}
              <div className="flex items-center gap-x-1">
                <Time time={item.created_at} />
                {seenModeNode}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default MessageBox
