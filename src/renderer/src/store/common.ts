import { proxy, useSnapshot } from 'valtio';

interface ICommonStore {
  windowTitle: string;
}

class CommonStore {
  state = proxy<ICommonStore>({
    windowTitle: '',
  });

  getSnapshot = () => useSnapshot(this.state);

  setWindowTitle = (title: string) => (this.state.windowTitle = title);
}

const commonStore = new CommonStore();

export default commonStore;
