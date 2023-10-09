import { createContext } from 'react';

export interface IAppContext {
  handleOpenProject: () => void;
}

const AppContext = createContext<IAppContext | unknown>({});

export default AppContext;
