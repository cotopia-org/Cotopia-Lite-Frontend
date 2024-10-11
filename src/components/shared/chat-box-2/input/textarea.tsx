import React, { useState, useRef, useEffect } from "react";

type Props = {
  onChange: (value: string) => void;
  onSend: (value: string) => void;
  defaultValue?: string;
};

const MultilineTextarea: React.FC<Props> = ({
  defaultValue,
  onChange,
  onSend,
}) => {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    if (defaultValue !== undefined) setText(defaultValue);
  }, [defaultValue]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Adjust the height of the textarea dynamically based on its content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height first
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on scroll height
    }
  }, [text]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line on Enter without Shift
      if (onSend) onSend(text);
      setText("");
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={(e) => {
        const value = e.target.value;
        setText(value);
        onChange(value);
      }}
      onKeyDown={handleKeyDown}
      placeholder='Type your message here...'
      rows={1} // Start with one line by default
      className='outline-none w-full min-h-[32px] overflow-y-auto max-h-[200px] text-sm'
      style={{ resize: "none" }}
    />
  );
};

export default MultilineTextarea;
