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

function updateObj(obj: any, key: string, value: any): void {
  const keys = key.split('.');
  let currentObj: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const currentKey = keys[i];
    if (!(currentKey in currentObj)) {
      currentObj[currentKey] = {};
    }
    currentObj = currentObj[currentKey];
  }

  const lastKey = keys[keys.length - 1];
  currentObj[lastKey] = value;
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
    this.recordMap.value.set(item.id, item.configuration);
  };

  getConfiguration = (id: string) => this.recordMap.value.get(id);

  updateMaterialStyle = (materialId: string, key: string, value: any) => {
    const style = this.getConfiguration(materialId)?.style;
    updateObj(style, key, value);
  };
}

const editorStore = new EditorStore();

export default editorStore;
