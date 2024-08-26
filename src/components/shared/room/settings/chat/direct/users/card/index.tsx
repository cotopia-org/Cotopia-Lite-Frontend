"use client"
import CotopiaAvatar from "@/components/shared-ui/c-avatar"
import { UserMinimalType } from "@/types/user"
import Username from "./username"
import Message from "./message"

import { ChatItemType } from "@/types/chat"

type Props = {
  user: UserMinimalType
  latestMessage?: ChatItemType
  onClick: () => void
}
export default function UserCard({ user, latestMessage, onClick }: Props) {
  let msgUnseen = latestMessage?.seen === false
  let isMineMsg = user.id !== latestMessage?.user.id

  let isMsgUnseen = msgUnseen && !isMineMsg

  let userNameClss = ""
  let lastMsgClss = ""

  if (isMsgUnseen) {
    userNameClss += " !text-black"
    lastMsgClss += " !font-semibold !text-black/[0.78]"
  }

  return (
    <div
      className="flex flex-row items-center gap-x-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        {isMsgUnseen ? (
          <div className="rounded-full w-[10px] h-[10px] z-[2] absolute bg-red-500 top-0 right-0"></div>
        ) : null}
        <CotopiaAvatar
          src={user?.avatar?.url ?? undefined}
          title={(user?.name || user?.username)?.[0] ?? undefined}
        />
      </div>

      <div className="flex flex-col">
        <Username className={userNameClss} username={user?.username} />
        {!!latestMessage && (
          <Message className={lastMsgClss} message={latestMessage.text} />
        )}
      </div>
    </div>
  )
}
