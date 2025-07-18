"use client";

import { useAutoResizeTextarea } from "../hooks/useAutoResizeTextarea";

interface AutoResizeTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  className?: string;
  minHeight?: string;
  maxHeight?: string;
}

export default function AutoResizeTextarea({
  placeholder,
  value,
  onChange,
  onKeyPress,
  className = "",
  minHeight = "10px",
  maxHeight = "400px",
}: AutoResizeTextareaProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onChange?.(e);
  };

  const handleInput = () => {
    adjustHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyPress={onKeyPress}
      onInput={handleInput}
      style={{
        minHeight,
        maxHeight,
        overflow: "auto",
      }}
      className={`custom-scrollbar w-full resize-none focus:outline-none ${className}`}
    />
  );
}
