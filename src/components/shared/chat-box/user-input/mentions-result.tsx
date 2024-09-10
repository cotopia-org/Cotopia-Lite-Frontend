import { useApi } from "@/hooks/swr"
import { FetchDataType } from "@/lib/axios"
import { urlWithQueryParams } from "@/lib/utils"
import { WorkspaceRoomType } from "@/types/room"
import { UserMinimalType } from "@/types/user"
import { WorkspaceType } from "@/types/workspace"
import React from "react"
import FullLoading from "../../full-loading"
import NotFound from "../../layouts/not-found"
import CotopiaButton from "@/components/shared-ui/c-button"
import UserCardItem from "../../user-selector/list/item"

interface Props {
  search?: string
  onSelect: (user: UserMinimalType | { username: string }) => void
}

export type MentionResultType = {
  users: UserMinimalType[]
  rooms: WorkspaceRoomType[]
  workspaces: WorkspaceType[]
}

const MentionResultViewer = ({ search = "", onSelect }: Props) => {
  const { data, isLoading } = useApi<FetchDataType<MentionResultType>>(
    urlWithQueryParams(`/messages/searchMention`, {
      q: search === "@" ? "" : search.slice(1),
    }),
    {
      method: "GET",
      key: `/messages/searchMention?q=${search}`,
    }
  )

  const mentionItems: any = (data && data.data) ?? {
    users: [],
    rooms: [],
    workspaces: [],
  }

  const finalMentions = Object.keys(mentionItems).filter((item: any) => {
    return mentionItems?.[item].length > 0 && item === "users"
  })

  const finalLength = Object.values(mentionItems).flatMap((x) => x).length

  const loading = isLoading || data === undefined

  let content = null

  if (loading) content = <FullLoading className="py-2" />

  if (finalLength === 0 && !loading)
    content = <NotFound title="Not found any items!" />
  if (finalLength > 0) {
    content = (
      <div className="flex flex-col max-h-[300px] w-full gap-y-2">
        {finalMentions.map((model) => {
          let modelItems = mentionItems?.[model] ?? []

          let view = null

          switch (model) {
            case "users":
              view = (
                <div className="flex w-full flex-col gap-y-1">
                  <CotopiaButton
                    onClick={() => onSelect({ username: "everyone" })}
                    variant={"outline"}
                  >
                    Everyone
                  </CotopiaButton>
                  {modelItems.map((user: UserMinimalType) => {
                    return (
                      <UserCardItem
                        onPick={onSelect}
                        item={user}
                        key={user.id}
                      />
                    )
                  })}
                </div>
              )
              break
          }

          return (
            <div
              key={model}
              className="flex items-start w-full flex-col gap-y-2 pb-2"
            >
              <strong className="py-1 border-b text-left w-full">
                {model}
              </strong>
              {view}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div
      className={`flex w-full overflow-y-auto flex-col items-center justify-center p-4 bg-white text-center absolute bottom-full mb-1 rounded-lg shadow-md border `}
    >
      {content}
    </div>
  )
}

export default MentionResultViewer
