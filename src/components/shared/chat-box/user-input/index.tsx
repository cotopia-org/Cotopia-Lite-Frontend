import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react"
import EmojiButton from "./emoji"
import SendButton from "./send"

type Props = {
  onAdd: (message: string) => void
  className?: string
  defaultValue?: string
  beforeNode?: ReactNode
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  isReplyState?: boolean
}

export default function ChatUserInput({
  onAdd,
  className = "",
  beforeNode,
  defaultValue,
  isReplyState,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>()
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault() // Prevents the newline from being added
      e.currentTarget.form?.requestSubmit() // Submits the form programmatically
    }
  }

  useEffect(() => {
    if (isReplyState === true && inputRef.current !== undefined) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isReplyState, inputRef?.current])

  return (
    <div
      className={`flex flex-col bg-black/10 relative rounded-xl ${className}`}
    >
      {beforeNode && beforeNode}
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-row items-center gap-x-2 pr-2"
      >
        <textarea
          id="chat-input"
          defaultValue={defaultValue}
          onKeyDown={handleKeyDown}
          dir="auto"
          rows={1}
          ref={(x) => {
            if (x === null) return
            inputRef.current = x
          }}
          onChange={onChange}
          placeholder="Type a message..."
          className="w-full  resize-none bg-transparent !outline-none focus-visible:!ring-offset-0 !ring-transparent !ring-0 p-4 min-h-[56px] !border-0 !shadow-none"
        />
        <div className="flex flex-row items-center">
          <EmojiButton />
          <SendButton onClick={handleAddMessage} />
        </div>
      </form>
    </div>
  )
}
