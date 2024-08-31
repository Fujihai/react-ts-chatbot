// 对话窗口-模块
import MessageInput from "../../components/message-input/MessageInput";
import Paper from '@mui/material/Paper';
import { Alert, Box, List, Snackbar } from "@mui/material";
import { useState } from "react";
import type { Message } from "../../types/Message";
import MessageComponent from "../../components/message/MessageComponent";
import SettingsDialog from "../../components/settings/SettingsDialog";

// 配置信息
const OPENROUTER_CONFIG = {
  api: "https://openrouter.ai/api/v1/chat/completions",
  model: "mistralai/mistral-7b-instruct:free",
}


function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const handleSendMessage = (message: string) => {
    const localApiKey = localStorage.getItem('apiKey')

    if (!localApiKey) {
      setOpenSnackBar(true)
      return;
    }

    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      role: "user",
      content: message,
      timestamp: new Date()
    }]);



    fetch(OPENROUTER_CONFIG.api, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": OPENROUTER_CONFIG.model,
        "messages": [
          // 将历史消息加入到请求中，触发上下文回答
          // ...messages.filter(message => message.role === "user"),
          { "role": "user", "content": `${message}` },
        ],
      })
    }).then(res => res.json()).then(result => {
      console.log('result', result)
      setMessages(prev => [...prev, result?.choices[0]?.message])
    });
  }

  return (
    <Paper style={{ height: '95vh', display: 'flex', flexDirection: 'column', padding: "12px", width: '88vw', margin: '0 auto' }} elevation={0}>
      <SettingsDialog />
      <Box flexGrow={1} overflow="auto">
        <List>
          {messages.map(message => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </List>
      </Box>
      <MessageInput onSendMessage={handleSendMessage} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          未找到有效 API Key，请重新设置!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default ChatWindow;
