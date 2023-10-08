import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import router from '@/routes';
import { HeaderHeight } from './components/Header';
import { RouterProvider } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';

function App() {
 
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          'html,body,#root': { width: '100%', height: '100%' },
          '#root': { paddingTop: `${HeaderHeight}px` },
          '::-webkit-scrollbar': {
            width: '6px',
            height: '8px',
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '2px',
            backgroundColor: '#989898',
            cursor: 'pointer',
          },
          '::-webkit-scrollbar-track': {
            boxShadow: 'none',
            background: 'transparent',
            borderRadius: '10px',
          },
        }}
      />
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </>
  );
}

export default App;
