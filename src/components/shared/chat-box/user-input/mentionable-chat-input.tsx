"use client"

import { ReactNode, useState, useEffect, ChangeEvent, useCallback } from "react"
import ChatUserInput from "."
import { useApi } from "@/hooks/swr"
import { FetchDataType } from "@/lib/axios"
import { urlWithQueryParams } from "@/lib/utils"
import { WorkspaceRoomShortType, WorkspaceRoomType } from "@/types/room"
import { UserMinimalType } from "@/types/user"
import { WorkspaceType } from "@/types/workspace"
import MentionResultViewer from "./mentions-result"
import Linkify from "react-linkify"

interface Props {
  beforeNode?: ReactNode
  defaultValue?: string
}

export type searchQueryType = "users" | "rooms" | "workspaces"

function findMentionIndex(text: string, searchTerms: string[]) {
  const indexes: number[] = []

  let startIndex = 0
  for (const searchTerm of searchTerms) {
    const indexOfSearchTerm = text.indexOf(searchTerm, startIndex)

    if (indexOfSearchTerm === -1) {
      break
    }
    indexes.push(indexOfSearchTerm)
    startIndex = indexOfSearchTerm + searchTerm.length
  }

  return indexes
}

const MentionableChatInput = ({ beforeNode, defaultValue }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedModel, setSelectedModel] = useState<
    UserMinimalType | undefined
  >(undefined)

  const [mentions, setMentions] = useState<any[]>([])
  const [targetMention, setTargetMention] = useState<any>()

  useEffect(() => {
    const inputElement = document.getElementById(
      "chat-input"
    ) as HTMLTextAreaElement
    if (!inputElement) return
    if (selectedModel && targetMention) {
      const username = `@${selectedModel.username}`
      const targetVal = targetMention?.value ?? ""
      const startIndex = targetMention.startIndex
      let partToAdd = value.slice(startIndex)
      let updateText = partToAdd.replace(targetVal, username)
      let newText = value.slice(0, startIndex) + updateText
      inputElement.value = newText
      inputElement.focus()
    }
  }, [selectedModel, targetMention, value])

  const changeInputValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let lastModel = selectedModel
    if (lastModel) setSelectedModel(undefined)
    let inputValue = e.target.value
    setValue(inputValue)
    if (inputValue.length === 0) setOpen(false)
    let pointerStart = e.target.selectionStart
    // Detect the latest mention (word starting with "@")
    const mentionRegex = /@[a-zA-Z0-9._-]*|@/g

    const match = inputValue.match(mentionRegex) ?? []

    const idsxs = findMentionIndex(inputValue, match)

    const mentions = match.map((item, key) => {
      return {
        id: Math.floor(Math.random() * 10000),
        value: item,
        startIndex: idsxs[key],
        endIndex: item.length - 1 + idsxs[key],
      }
    })
    const currentMention = mentions.find((mention) => {
      const cursorIndex = pointerStart - 1
      const currentFrame =
        cursorIndex >= mention.startIndex && cursorIndex <= mention.endIndex
      return !!currentFrame
    })
    if (!!currentMention) setOpen(true)
    setTargetMention(currentMention)
    setMentions(mentions)
  }

  const selectUserHandler = (user: UserMinimalType) => {
    setSelectedModel(user)
    setOpen(false)
  }

  console.log(value, "VALUE")
  return (
    <div className="relative w-full ">
      {!!open && !!value && (
        <MentionResultViewer
          onSelect={selectUserHandler}
          search={targetMention?.value ?? ""}
        />
      )}
      <ChatUserInput
        onChange={changeInputValueHandler}
        isReplyState
        defaultValue={defaultValue}
        onAdd={(text) => {}}
        beforeNode={beforeNode}
      />
    </div>
  )
}

export default MentionableChatInput
