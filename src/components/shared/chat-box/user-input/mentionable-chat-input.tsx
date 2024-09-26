"use client"

import { ReactNode, useState, useEffect, ChangeEvent, useCallback } from "react"
import ChatUserInput from "."
import { UserMinimalType } from "@/types/user"
import MentionResultViewer from "./mentions-result"
import {
  MessageMentionType,
  MessagePayloadType,
} from "@/hooks/chat/use-chat-socket"

interface Props {
  beforeNode?: ReactNode
  defaultValue?: string
  onAdd: (payload: MessagePayloadType) => void
}

export type UserModelType = UserMinimalType | { username: string }
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

const MentionableChatInput = ({ beforeNode, defaultValue, onAdd }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [selectedModel, setSelectedModel] = useState<
    UserMinimalType | { username: string } | undefined
  >(undefined)

  const [mentions, setMentions] = useState<any[]>([])
  const [models, setModels] = useState<UserModelType[]>([])
  const [targetMention, setTargetMention] = useState<any>()

  const inputElement = document.getElementById(
    "chat-input"
  ) as HTMLTextAreaElement

  useEffect(() => {
    if (!inputElement) return
    if (selectedModel && targetMention) {
      const username = `@${selectedModel.username}`
      let lastMentions = [...mentions]
      let finedIndx = lastMentions.findIndex(
        (i) => i.startIndex === targetMention.startIndex
      )
      lastMentions[finedIndx] = {
        ...lastMentions[finedIndx],
        value: username,
        endIndex: targetMention.startIndex + username.length - 1,
        id: (selectedModel as any)?.id ?? "",
      }
      const targetVal = targetMention?.value ?? ""
      const startIndex = targetMention.startIndex
      let partToAdd = value.slice(startIndex)
      let updateText = partToAdd.replace(targetVal, username)
      let newText = value.slice(0, startIndex) + updateText
      setMentions(lastMentions)
      inputElement.value = newText
      inputElement.focus()
    }
  }, [selectedModel, targetMention, value, inputElement])

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
    const currMentions = match.map((item, key) => {
      return {
        value: item,
        startIndex: idsxs[key],
        endIndex: item.length - 1 + idsxs[key],
      }
    })

    const currentMention = currMentions.find((mention) => {
      const cursorIndex = pointerStart - 1
      const currentFrame =
        cursorIndex >= mention.startIndex && cursorIndex <= mention.endIndex
      return !!currentFrame
    })
    if (!!currentMention) setOpen(true)
    setTargetMention(currentMention)
    setMentions(currMentions)
  }

  const selectUserHandler = (user: UserMinimalType | { username: string }) => {
    setSelectedModel(user)
    setModels((crt) => [...crt, user])
    setOpen(false)
  }

  const submitMessageHandler = useCallback(() => {
    setValue("")
    setTargetMention(undefined)
    //remove duplicate models
    const lastModels = [...models].filter(
      (item, index, array) =>
        array.map((x: any) => x.id).indexOf((item as any).id) === index
    )
    const correctedMentions: MessageMentionType[] = mentions.map((mention) => {
      const modelItem: UserModelType | undefined = lastModels.find(
        (m) => `@${m.username}` === mention.value
      )

      return {
        start_position: mention.startIndex,
        model_type: "user",
        model_id: (modelItem as UserMinimalType)?.id ?? "",
      }
    })

    let payload: MessagePayloadType = {
      text: inputElement.value,
      mentions: correctedMentions,
    }

    let isMentionEveryone =
      mentions.find((m) => m.value === "@everyone") ?? undefined
    if (isMentionEveryone) payload["mentioned_everyone"] = true

    onAdd(payload)
  }, [mentions, targetMention, value, selectedModel, models])

  return (
    <div className="relative w-full ">
      {!!open && !!targetMention && (
        <MentionResultViewer
          onSelect={selectUserHandler}
          search={targetMention?.value ?? ""}
        />
      )}
      <ChatUserInput
        onChange={changeInputValueHandler}
        isReplyState
        defaultValue={defaultValue}
        onAdd={submitMessageHandler}
        beforeNode={beforeNode}
      />
    </div>
  )
}

export default MentionableChatInput
