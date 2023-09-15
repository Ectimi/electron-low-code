import { cloneElement, useMemo } from 'react';
import { IMaterialItem } from '@/materials/createMaterial';
import store from '@/store';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  return (
    <>
      {materials.map((material) => {
        const cloneComponent = cloneElement(material.component, {
          key:material.id,
          ...store.getConfiguration(material.id),
        });
        return cloneComponent;
      })}
    </>
  );
}
