import React, { useState } from "react";

type ChatInputProps = {
  addMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ addMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      addMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        placeholder='Type a message...'
      />
      <button
        onClick={handleSend}
        className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
