import { proxy, useSnapshot } from 'valtio';

interface ICommonStore {
  currentProjectName: string;
  currentProjectPath: string;
}

class CommonStore {
  state = proxy<ICommonStore>({
    currentProjectName:'',
    currentProjectPath:''
  });

  getSnapshot = () => useSnapshot(this.state);
}

const commonStore = new CommonStore();

export default commonStore;
