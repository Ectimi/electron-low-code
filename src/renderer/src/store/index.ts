import { IMaterialItem } from '@/materials/types';
import { proxy, useSnapshot } from 'valtio';

interface IStore {
  materialList: IMaterialItem[];
  selectedMaterial: string | null;
  canvas: {
    width: number;
    height: number;
  };
}

class Store {
  state = proxy<IStore>({
    selectedMaterial: null,
    materialList: [],

    canvas: {
      width: 1920,
      height: 1080,
    },
  });

  getSnapshot = () => useSnapshot(this.state);

  setSelectedMaterial = (materialId: IStore['selectedMaterial']) =>
    (this.state.selectedMaterial = materialId);

  addMaterial = (item: IMaterialItem) => {
    this.state.materialList.push(item);
    this.setSelectedMaterial(item.id);
  };
}

const store = new Store();

export default store;
