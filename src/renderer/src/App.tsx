import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import router from "@/routes";
import { HeaderHeight } from "@/components/Header";
import { RouterProvider } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import AppContext, { IAppContext } from "@/context";
import { getIsValidProject, selectFloder } from "@/api";
import showMessage from "@/components/Message";
import { useMount } from "ahooks";
import { EMenuAction } from "root/types/MenuAction";
import modalStore from "@/store/modal";
import { EventName } from "root/types/EventName";

const { ipcRenderer } = window.electronApi;

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
        content: "该路径不是合法的项目",
        type: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const provider: IAppContext = {
    handleCreateProject,
    handleOpenProject,
    handleNewWindow,
  };

  useMount(() => {
    ipcRenderer.removeAllListeners(EMenuAction.CreateProject);
    ipcRenderer.removeAllListeners(EMenuAction.OpenProject);
    ipcRenderer.removeAllListeners(EMenuAction.NewWindow);

    ipcRenderer.on(EMenuAction.CreateProject, handleCreateProject);
    ipcRenderer.on(EMenuAction.NewWindow, handleNewWindow);
    ipcRenderer.on(EMenuAction.OpenProject, handleOpenProject);
  });

  return (
    <AppContext.Provider value={provider}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html,body,#root": { width: "100%", height: "100%" },
          "#root": { paddingTop: `${HeaderHeight}px` },
          "::-webkit-scrollbar": {
            width: "6px",
            height: "8px",
          },
          "::-webkit-scrollbar-thumb": {
            borderRadius: "2px",
            backgroundColor: "#989898",
            cursor: "pointer",
          },
          "::-webkit-scrollbar-track": {
            boxShadow: "none",
            background: "transparent",
            borderRadius: "10px",
          },
        }}
      />
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </AppContext.Provider>
  );
}

export default App;
