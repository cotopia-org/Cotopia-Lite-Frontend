"use client"
import CotopiaAvatar from "@/components/shared-ui/c-avatar"
import { UserMinimalType } from "@/types/user"
import Username from "./username"
import Message from "./message"
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper"
import { MessageType } from "@/types/message"
import { useState } from "react"

type Props = {
  user: UserMinimalType
  latestMessage?: string
  onClick: () => void
}
export default function UserCard({ user, latestMessage, onClick }: Props) {
  return (
    <div
      className="flex flex-row items-center gap-x-4 cursor-pointer"
      onClick={onClick}
    >
      <CotopiaAvatar
        src={user?.avatar?.url ?? undefined}
        title={(user?.name || user?.username)?.[0] ?? undefined}
      />
      <div className="flex flex-col">
        <Username username={user?.username} />
        {!!latestMessage && <Message message={latestMessage} />}
      </div>
    </div>
  )
}
