import { nanoid } from 'nanoid';
import MImage from '@/materials/MImage';
import MText from '@/materials/MText';
import MButton from '@/materials/MButton';
import { EMaterialName, IMaterial } from './types/material';
import { FC } from 'react';

type MaterialFC = FC & {
    __default_configuration: IMaterial['property']; 
  };

export interface IMaterialItem {
  id: string;
  name: EMaterialName;
  component: React.ReactElement;
  defaultConfiguration: IMaterial['property'];
}

const componentMap: Record<EMaterialName, MaterialFC> = {
  [EMaterialName.MButton]: MButton as unknown as MaterialFC,
  [EMaterialName.MImage]: MImage as unknown as MaterialFC,
  [EMaterialName.MText]: MText as unknown as MaterialFC,
};

export default function createMaterial(name: EMaterialName): IMaterialItem {
  const id = nanoid();
  const Component = componentMap[name];

  return {
    id,
    name,
    component: <Component />,
    defaultConfiguration: Component.__default_configuration,
  };
}
