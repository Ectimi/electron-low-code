import { nanoid } from 'nanoid';
import MImage from '@/materials/MImage';
import MText from '@/materials/MText';
import MButton from '@/materials/MButton';
import { EMaterialName, IMaterial } from '../types/material';
import { FC } from 'react';

type MaterialFC = FC & {
    __default_configuration: IMaterial['property']; 
  };

export interface IMaterialItem {
  id: string;
  name: EMaterialName;
  component: MaterialFC;
  configuration: IMaterial['property'];
}

const componentMap: Record<EMaterialName, MaterialFC> = {
  [EMaterialName.Button]: MButton as unknown as MaterialFC,
  [EMaterialName.Image]: MImage as unknown as MaterialFC,
  [EMaterialName.Text]: MText as unknown as MaterialFC,
};

export default function createMaterial(name: EMaterialName): IMaterialItem {
  const id = name + '__' + nanoid();
  const component = componentMap[name];

  return {
    id,
    name,
    component,
    configuration: component.__default_configuration,
  };
}
