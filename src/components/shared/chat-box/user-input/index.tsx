import React, { FormEvent, ReactNode, useEffect, useRef } from "react";
import EmojiButton from "./emoji";
import SendButton from "./send";

type Props = {
  onAdd: (message: string) => void;
  defaultValue?: string;
  beforeNode?: ReactNode;
  isReplyState?: boolean;
};

export default function ChatUserInput({
  onAdd,
  beforeNode,
  defaultValue,
  isReplyState,
}: Props) {
  const inputRef = useRef<HTMLInputElement>();
  const handleAddMessage = () => {
    if (!inputRef.current) return;

    const value = inputRef.current?.value;

    if (!value) {
      return;
    }

    if (onAdd) onAdd(value);

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handleAddMessage();
  };

  useEffect(() => {
    if (isReplyState === true && inputRef.current !== undefined) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isReplyState, inputRef?.current]);

  return (
    <div className='flex flex-col bg-black/10 relative rounded-xl '>
      {beforeNode && beforeNode}
      <form
        onSubmit={handleSubmitForm}
        className='flex flex-row items-center gap-x-2 pr-2'
      >
        <input
          defaultValue={defaultValue}
          dir='auto'
          ref={(x) => {
            if (x === null) return;
            inputRef.current = x;
          }}
          placeholder='Type a message...'
          className='w-full bg-transparent !outline-none focus-visible:!ring-offset-0 !ring-transparent !ring-0 p-4 !h-auto !border-0 !shadow-none'
        />
        <div className='flex flex-row items-center'>
          <EmojiButton />
          <SendButton onClick={handleAddMessage} />
        </div>
      </form>
    </div>
  );
}
