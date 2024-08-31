// 消息输入框-组件
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (message: string) => {
    if (inputValue.trim().length === 0) return;

    onSendMessage(message);
    setInputValue("");
  };

  return (
    <TextField
      multiline
      fullWidth
      InputProps={{
        value: inputValue,
        disableUnderline: true,
        placeholder: "Message ChatBot...",
        style: {
          width: "100%",
        },
        endAdornment: (
          <InputAdornment position="start">
            <FaArrowCircleUp
              style={{
                fontSize: 32,
                cursor:
                  inputValue.trim().length > 0 ? "pointer" : "not-allowed",
                color: inputValue.trim().length > 0 ? "#1976d2" : "#ccc",
                transition: "all 0.3s ease-in",
              }}
              onClick={() => handleSendMessage(inputValue.trim())}
            />
          </InputAdornment>
        ),
        onChange: (e) => {
          setInputValue(e.target.value);
        },
        onKeyUp: (e) => {
          if (e.key === "Enter") {
            handleSendMessage(inputValue.trim())
          }
        },
      }}
    />
  );
}

export default MessageInput;
