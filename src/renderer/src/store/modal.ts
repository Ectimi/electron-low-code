import { proxy, useSnapshot } from 'valtio';

interface IModalStore {
  CreateProjectModalOpen: boolean;
}

class ModalStore {
  state = proxy<IModalStore>({
    CreateProjectModalOpen: false,
  });

  getSnapshot = () => useSnapshot(this.state);

  toggleCreateProjectModal = (bool: boolean) =>
    (this.state.CreateProjectModalOpen = bool);
}

const modalStore = new ModalStore();

export default modalStore;
