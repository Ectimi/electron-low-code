import { proxy } from 'valtio';

interface ICommonStore {
  currentProjectName: string;
  currentProjectPath: string;
}

class CommonStore {
  state = proxy<ICommonStore>({
    currentProjectName:'',
    currentProjectPath:''
  });
}

const commonStore = new CommonStore();

export default commonStore;
