import { createContext } from "react";

export interface IAppContext {
  handleOpenProject: () => void;
  handleCreateProject: () => void;
  handleNewWindow: () => void;
}

const AppContext = createContext<IAppContext | unknown>({});

export default AppContext;
