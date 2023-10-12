import { createContext } from "react";
import { noop } from "root/types/common";

export interface IAppContext {
  handleOpenProject: noop;
  handleCreateProject: noop;
  handleNewWindow: noop;
}

const AppContext = createContext<IAppContext | unknown>({});

export default AppContext;
