import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import router from '@/routes';
import { HeaderHeight } from '@/components/Header';
import { RouterProvider } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import AppContext, { IAppContext } from '@/context';
import { getIsValidProject, getWindowNumbers, selectFloder } from '@/api';
import showMessage from '@/components/Message';
import { useMount } from 'ahooks';
import { EMenuAction } from 'root/types/MenuAction';
import modalStore from '@/store/modal';
import { EventName } from 'root/types/EventName';
import { IEventBeforClose } from 'root/types/ParamsType';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const { ipcRenderer, isMac } = window.electronApi;

function App() {
  const handleCreateProject = () => modalStore.toggleCreateProjectModal(true);
  const handleNewWindow = () => ipcRenderer.sendSync(EventName.NEW_WINDOW);
  const handleOpenProject = async () => {
    const path = await selectFloder();
    const res = await getIsValidProject(path);

    if (res.isValid) {
      location.hash = `#/editor?projectName=${res.projectName}&projectPath=${res.projectPath}`;
    } else {
      showMessage({
        content: '该路径不是合法的项目',
        type: 'error',
        autoHideDuration: 2000,
      });
    }
  };
  const handleBeforeClose = async () => {
    const windowNumber = await getWindowNumbers();
    if (windowNumber === 1) {
      const urlParams = new URLSearchParams(
        window.location.hash.replace('#/editor?', '')
      );
      const projectName = urlParams.get('projectName');
      const projectPath = urlParams.get('projectPath');
      if (projectName && projectPath) {
        ipcRenderer.sendSync<IEventBeforClose>(EventName.BEFORE_CLOSE, {
          projectName,
          projectPath,
          lastClosePath: '/editor',
        });
      } else {
        ipcRenderer.sendSync<IEventBeforClose>(EventName.BEFORE_CLOSE, {
          lastClosePath: '/welcome',
        });
      }
    }
    if (!isMac) {
      ipcRenderer.sendSync(EventName.WIN_CLOSE);
    }
  };

  const provider: IAppContext = {
    handleCreateProject,
    handleOpenProject,
    handleNewWindow,
    handleBeforeClose,
  };

  useMount(() => {
    ipcRenderer.removeAllListeners(EMenuAction.CreateProject);
    ipcRenderer.removeAllListeners(EMenuAction.OpenProject);
    ipcRenderer.removeAllListeners(EMenuAction.NewWindow);

    ipcRenderer.on(EMenuAction.CreateProject, handleCreateProject);
    ipcRenderer.on(EMenuAction.NewWindow, handleNewWindow);
    ipcRenderer.on(EMenuAction.OpenProject, handleOpenProject);

    if (isMac) {
      window.onbeforeunload = () => {
        handleBeforeClose();
      };
    }
  });

  return (
    <AppContext.Provider value={provider}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
