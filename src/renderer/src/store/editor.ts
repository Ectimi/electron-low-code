import { IMaterialItem } from '@/materials/createMaterial';
import { proxy } from 'valtio';
import { proxyWithHistory } from 'valtio/utils';
import set from 'lodash/set';
import { produce } from 'immer';
import { IMaterial } from '@/materials/types/material';

export interface IEditorStore {
  currentMaterial: IMaterial['id'] | null;
  canvas: {
    width: number;
    height: number;
  };
}

class EditorStore {
  state = proxy<IEditorStore>({
    currentMaterial: null,

    canvas: {
      width: 1920,
      height: 1080,
    },
  });

  materialList = proxyWithHistory<IMaterialItem[]>([]);

  setCurrentMaterial = (materialId: IEditorStore['currentMaterial']) =>
    (this.state.currentMaterial = materialId);

  addMaterial = (item: IMaterialItem) => {
    this.materialList.value.push(item);
    this.setCurrentMaterial(item.id);
  };

  getMaterial = (materialId: string) =>
    this.materialList.value.filter(({ id }) => id === materialId)[0];

  getConfiguration = (materialId: string) =>
    this.getMaterial(materialId).configuration;

  updateMaterialStyle = (materialId: string, key: string, value: any) => {
    this.materialList.value = produce(this.materialList.value, (draft) => {
      const material = draft.filter(({ id }) => id === materialId)[0];
      if (material) {
        set(material, ['configuration', 'style', ...key.split('.')], value);
      }
    });
  };
}

const editorStore = new EditorStore();

export default editorStore;
