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
import { UserMinimalType } from "@/types/user"

interface Props {
  isMine: boolean
  user?: UserMinimalType
  fullWidth?: boolean
  item: ChatItemType
  beforeNode?: ReactNode
}

const MessageBox = forwardRef(
  ({ item, isMine, beforeNode, fullWidth = false, user }: Props, ref: any) => {
    const isMessageEdited = !!item.is_edited
    const isMessageSeen = !!item.seen

    const isDeleted = !!item?.deleted_at

    let messageBoxClss =
      "message-box relative flex flex-row items-center gap-x-4 p-2 rounded-lg"

    if (isDeleted) {
      messageBoxClss += " opacity-55 select-none pointer-events-none"
    }

    if (fullWidth) messageBoxClss += " w-full"
    if (!fullWidth) messageBoxClss += " w-[200px]"
    if (isMine) messageBoxClss += " !bg-blue-500/10"
    if (!isMine) messageBoxClss += " !bg-black/5"

    let footerClss = "flex w-full justify-end items-center"

    let seenModeNode = null
    let editLable = null

    if (isMessageEdited) {
      editLable = (
        <span className="text-xs pointer-events-none text-gray-600">
          Edited
        </span>
      )
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
        className="chat-item border-destructive overflow-hidden relative flex flex-col my-2 items-start gap-x-2 select-text"
      >
        <div className={messageBoxClss}>
          <div className="flex flex-col gap-y-2 w-full">
            <div
              className="flex flex-row items-center gap-x-2"
              style={{ overflowWrap: "anywhere" }}
            >
              <Avatar
                src={item?.user?.avatar?.url}
                className="w-5 h-5"
                title={getUserFullname(item?.user)?.[0]}
              />
              <Username username={item?.user?.username ?? ""} />
            </div>
            {beforeNode && beforeNode}
            <Message isMine={isMine} item={item} />
            <div className={footerClss}>
              {/**Reactions view should be here */}
              <div className="flex items-center gap-x-2">
                {editLable}
                <div className="flex items-center gap-x-1">
                  <Time time={item.created_at} />
                  {seenModeNode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default MessageBox
