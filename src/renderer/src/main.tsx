import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';
import './index.less';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} SnackbarProps={{ style: { top: '36px' } }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
