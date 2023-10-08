import { IMaterialItem } from '@/materials/createMaterial';
import { IMaterial } from '@/materials/types/material';
import { proxy, useSnapshot } from 'valtio';
import { proxyWithHistory } from 'valtio/utils';

interface IEditorStore {
  materialList: IMaterialItem[];
  currentMaterial: string | null;
  canvas: {
    width: number;
    height: number;
  };
}

type TRecord = Map<string, IMaterial['property']>;

class EditorStore {
  state = proxy<IEditorStore>({
    currentMaterial: null,
    materialList: [],

    canvas: {
      width: 1920,
      height: 1080,
    },
  });

  recordMap = proxyWithHistory<TRecord>(new Map());

  getSnapshot = () => useSnapshot(this.state);

  setCurrentMaterial = (materialId: IEditorStore['currentMaterial']) =>
    (this.state.currentMaterial = materialId);

  addMaterial = (item: IMaterialItem) => {
    this.state.materialList.push(item);
    this.setCurrentMaterial(item.id);
    this.recordMap.value.set(item.id, item.defaultConfiguration);
  };

  getConfiguration = (id: string) => this.recordMap.value.get(id);
}

const editorStore = new EditorStore();

export default editorStore;
