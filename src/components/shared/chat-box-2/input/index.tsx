import React, {
  FormEvent,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import EmojiHandlerButton from "./emoji";
import SendHandlerButton from "./send";
import MultilineTextarea from "./textarea";

type ChatInputProps = {
  addMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ addMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddMessage = useCallback((value: string) => {
    setInputValue("");
    addMessage(value.trim());
  }, []);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddMessage(inputValue.trim());
    }
  };

  const handleAddEmoji = useCallback(
    (emoji: string) => setInputValue((prev) => `${prev}${emoji}`),
    []
  );

  return (
    <form
      onSubmit={handleSend}
      className='flex items-end space-x-2 border border-black/10 rounded-lg p-2 bg-white'
    >
      <MultilineTextarea
        defaultValue={inputValue}
        onChange={setInputValue}
        onSend={handleAddMessage}
      />
      <div className='flex flex-row items-center'>
        <EmojiHandlerButton onPick={handleAddEmoji} />
        <SendHandlerButton text={inputValue} />
      </div>
    </form>
  );
};

export default ChatInput;
