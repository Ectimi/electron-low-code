import { useState } from 'react';
// material-ui
import { Snackbar, Alert } from '@mui/material';
import type { SnackbarProps, AlertProps } from '@mui/material';
import { createRoot } from 'react-dom/client';

interface IProps extends SnackbarProps {
  type?: AlertProps['severity'];
}

// eslint-disable-next-line react-refresh/only-export-components
function MessageComponent(props: IProps) {
  const { content, autoHideDuration, type } = { ...props };
  // 开关控制：默认true,调用时会直接打开
  const [open, setOpen] = useState(true);
  // 关闭消息提示
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={type} variant="standard">
        {content}
      </Alert>
    </Snackbar>
  );
}

export default function showMessage({
  content,
  autoHideDuration = 1500,
  type = 'success',
}: IProps) {
  // 创建一个dom
  const dom = document.createElement('div');
  // 定义组件，
  const JSXdom = (
    <MessageComponent
      content={content}
      autoHideDuration={autoHideDuration}
      type={type}
    />
  );
  // 渲染DOM
  createRoot(dom).render(JSXdom);
  // 置入到body节点下
  document.body.appendChild(dom);
}
