// OpenRouter API key 表单弹窗
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { IoSettingsOutline } from "react-icons/io5";

export default function SettingsDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} style={{ width: "88px" }} startIcon={<IoSettingsOutline />}>
        设置
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          style: {
            width: "600px",
          },
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const apiKey = formJson.apikey;

            // 设置 API Key 到 localStorage
            localStorage.setItem("apiKey", apiKey);

            handleClose();
          },
        }}
      >
        <DialogTitle>设置</DialogTitle>
        <DialogContent>
          <DialogContentText>请输入您的 API Key（确保 API Key 真实有效，否则程序无法正常使用）</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="apikey"
            name="apikey"
            label="API Key"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit">确定</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
