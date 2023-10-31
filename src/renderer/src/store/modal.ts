import { proxy } from 'valtio';

interface IModalStore {
  CreateProjectModalOpen: boolean;
  ResourceLibraryModalOpen: boolean;
  ResourceSelectModalOpen: boolean;
}

class ModalStore {
  state = proxy<IModalStore>({
    CreateProjectModalOpen: false,
    ResourceLibraryModalOpen: false,
    ResourceSelectModalOpen: false,
  });

  toggleCreateProjectModal = (bool: boolean) =>
    (this.state.CreateProjectModalOpen = bool);

  toggleResourceLibraryModal = (bool: boolean) =>
    (this.state.ResourceLibraryModalOpen = bool);

  toggleResourceSelectModal = (bool: boolean) =>
    (this.state.ResourceSelectModalOpen = bool);
}

const modalStore = new ModalStore();

export default modalStore;
