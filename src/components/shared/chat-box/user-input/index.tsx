import React, { FormEvent, LegacyRef, useRef } from "react"
import EmojiButton from "./emoji"
import SendButton from "./send"
import { Input } from "@/components/ui/input"

type Props = {
  onAdd: (message: string) => void
}

export default function ChatUserInput({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>()
  const handleAddMessage = () => {
    if (!inputRef.current) return

    const value = inputRef.current?.value

    if (!value) {
      return
    }

    if (onAdd) onAdd(value)

    inputRef.current.value = ""
    inputRef.current.focus()
  }

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    handleAddMessage()
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className="bg-black/10 relative rounded-xl flex flex-row items-center gap-x-2 pr-2"
    >
      <input
        ref={(x) => {
          if (x === null) return
          inputRef.current = x
        }}
        placeholder="Type a message..."
        className="w-full bg-transparent !outline-none focus-visible:!ring-offset-0 !ring-transparent !ring-0 p-4 !h-auto !border-0 !shadow-none"
      />
      <div className="flex flex-row items-center">
        <EmojiButton />
        <SendButton onClick={handleAddMessage} />
      </div>
    </form>
  )
}
