import { proxy } from 'valtio';

interface IModalStore {
  CreateProjectModalOpen: boolean;
  ResourceLibraryModalOpen: boolean;
}

class ModalStore {
  state = proxy<IModalStore>({
    CreateProjectModalOpen: false,
    ResourceLibraryModalOpen: false,
  });

  toggleCreateProjectModal = (bool: boolean) =>
    (this.state.CreateProjectModalOpen = bool);

  toggleResourceLibraryModal = (bool: boolean) =>
    (this.state.ResourceLibraryModalOpen = bool);
}

const modalStore = new ModalStore();

export default modalStore;
