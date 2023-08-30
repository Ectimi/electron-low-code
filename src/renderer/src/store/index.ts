import { IMaterialItem } from '@/core/types/material';
import { proxy } from 'valtio';

interface IStore {
  materialList: IMaterialItem[];
}

export const store = proxy<IStore>({
  materialList: [],
});

export const addMaterial = (item: IMaterialItem) =>
  store.materialList.push(item);
