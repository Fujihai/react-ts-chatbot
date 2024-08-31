// 单条消息-组件
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import type { Message } from "../../types/Message";
import { FcPortraitMode } from "react-icons/fc";
import { FcReddit } from "react-icons/fc";

interface MessageProps {
  message: Message;
}

function MessageComponent({ message }: MessageProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        {message.role === 'user' ? <FcPortraitMode /> : <FcReddit />}
      </ListItemAvatar>
      <ListItemText
        secondary={message.content}
        primary={message.role === 'user' ? 'You' : 'ChatBot'}
      />
    </ListItem>
  )
}

export default MessageComponent;