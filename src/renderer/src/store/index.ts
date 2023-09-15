import { IMaterialItem } from '@/materials/createMaterial';
import { IMaterial } from '@/materials/types/material';
import { proxy, useSnapshot } from 'valtio';
import { proxyWithHistory } from 'valtio/utils';

interface IStore {
  materialList: IMaterialItem[];
  selectedMaterial: string | null;
  canvas: {
    width: number;
    height: number;
  };
}

type TRecord = Map<string, IMaterial['property']>;

class Store {
  state = proxy<IStore>({
    selectedMaterial: null,
    materialList: [],

    canvas: {
      width: 1920,
      height: 1080,
    },
  });

  reordMap = proxyWithHistory<TRecord>(new Map());

  getSnapshot = () => useSnapshot(this.state);

  setSelectedMaterial = (materialId: IStore['selectedMaterial']) =>
    (this.state.selectedMaterial = materialId);

  addMaterial = (item: IMaterialItem) => {
    this.state.materialList.push(item);
    this.setSelectedMaterial(item.id);
    this.reordMap.value.set(item.id, item.defaultConfiguration);
  };

  getConfiguration = (id: string) => this.reordMap.value.get(id);
}

const store = new Store();

export default store;
