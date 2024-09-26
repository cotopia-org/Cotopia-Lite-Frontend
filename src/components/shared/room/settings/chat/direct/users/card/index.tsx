"use client"
import CotopiaAvatar from "@/components/shared-ui/c-avatar"
import { UserMinimalType } from "@/types/user"
import Username from "./username"
import Message from "./message"

import { ChatItemType } from "@/types/chat"
import { DirectType } from "@/types/direct"
import { useAppSelector } from "@/store/redux/store"

type Props = {
  user: UserMinimalType
  defaultLatest?: ChatItemType
  direct: DirectType
  onClick: () => void
}
export default function UserCard({
  user,
  direct,
  onClick,
  defaultLatest,
}: Props) {
  if (!user) return

  const roomSlice = useAppSelector((state) => state.roomSlice)

  const chatRoom = roomSlice?.chatRoom ?? {}

  const directMessages = chatRoom?.[direct.id]?.messages ?? []

  let latestMessage: ChatItemType | undefined = defaultLatest

  if (directMessages.length > 0) {
    latestMessage = directMessages[0]
  }

  let msgUnseen = latestMessage?.seen === false
  let isMineMsg = user?.id !== latestMessage?.user?.id

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
          <Message
            className={lastMsgClss}
            message={latestMessage?.text ?? ""}
          />
        )}
      </div>
    </div>
  )
}
