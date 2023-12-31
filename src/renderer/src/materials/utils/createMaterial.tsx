import { nanoid } from 'nanoid';
import MImage from '@/materials/MImage';
import MText from '@/materials/MText';
import MButton from '@/materials/MButton';
import MBox from '@/materials/MBox';
import { EMaterialName, IMaterial } from '../types/material';
import { FC } from 'react';

type MaterialFC = FC & {
  __default_property: IMaterial['property'];
};

export interface IMaterialItem extends IMaterial {
  component: MaterialFC;
}

const componentMap: Record<EMaterialName, MaterialFC> = {
  [EMaterialName.Button]: MButton as unknown as MaterialFC,
  [EMaterialName.Image]: MImage as unknown as MaterialFC,
  [EMaterialName.Text]: MText as unknown as MaterialFC,
  [EMaterialName.Box]: MBox as unknown as MaterialFC,
};

export default function createMaterial(
  name: EMaterialName,
  parentId: IMaterial['parentId'] = null
): IMaterialItem {
  const id = name + '__' + nanoid();
  const component = componentMap[name];

  return {
    id,
    name,
    parentId,
    component,
    property: component.__default_property,
  };
}
