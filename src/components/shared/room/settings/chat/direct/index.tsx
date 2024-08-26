"use client"

import React, { useCallback, useState } from "react"
import Users from "./users"
import { UserMinimalType } from "@/types/user"
import Directs from "./directs"
import { DirectType } from "@/types/direct"
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper"
import SearchInputShower from "./search/SearchInputViewer"
import RoomDirectEnv from "./direct-chat/RoomDirectEnv"
import LocalDirectEnv from "./direct-chat/LocalDirectEnv"
import { useApi } from "@/hooks/swr"
import { FetchDataType } from "@/lib/axios"
import FullLoading from "@/components/shared/full-loading"

export default function UserChatDirect() {
  const { user } = useProfile()

  const [selectedDirect, setSelectedDirect] = useState<DirectType>()

  const [selectedUser, setSelectedUser] = useState<UserMinimalType>()

  const { data, isLoading, mutate } =
    useApi<FetchDataType<DirectType[]>>(`/users/directs`)

  const directs = data !== undefined ? data?.data : []

  const loading = isLoading || data === undefined

  const handleBackToList = () => {
    setSearched("")
    setSelectedDirect(undefined)
    setSelectedUser(undefined)
    mutate()
  }
  const [searched, setSearched] = useState("")

  const selectUserHandler = useCallback(
    (user: UserMinimalType) => {
      const findedDirect = directs.find((direct) => {
        let participant = direct.participants.find((u) => u.id === user.id)
        return participant ? direct : undefined
      })
      setSearched("")
      if (findedDirect) {
        setSelectedDirect(findedDirect)
      } else {
        setSelectedUser(user)
      }
    },
    [searched, directs]
  )

  let content = (
    <>
      <div className="flex flex-col gap-y-4 pb-4">
        <SearchInputShower
          onChange={setSearched}
          content={
            <Users
              search={searched ?? undefined}
              showNotFound={false}
              onSelect={selectUserHandler}
            />
          }
        />
        {loading ? (
          <FullLoading />
        ) : (
          <Directs
            directs={directs}
            search={searched ?? undefined}
            onSelect={setSelectedDirect}
          />
        )}
      </div>
    </>
  )

  if (selectedDirect)
    content = (
      <RoomDirectEnv
        direct_id={selectedDirect.id}
        user={
          selectedDirect.participants.find(
            (x) => x.id !== user.id
          ) as UserMinimalType
        }
        onBack={handleBackToList}
      />
    )

  if (selectedUser && !selectedDirect) {
    content = (
      <LocalDirectEnv
        onAdd={setSelectedDirect}
        user={selectedUser}
        onBack={handleBackToList}
      />
    )
  }

  return (
    <div className="relative h-full flex flex-col justify-between pt-4">
      {content}
    </div>
  )
}
