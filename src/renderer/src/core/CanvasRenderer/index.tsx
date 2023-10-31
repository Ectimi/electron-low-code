import { ReactElement, cloneElement } from 'react';
import { IMaterialItem } from '@/materials/createMaterial';
import store from '@/store/editor';
import editorStore from '@/store/editor';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  return (
    <>
      {materials.map((material) => {
        const fn = material.component;
        const Component = fn({ ...material.configuration });

        return cloneElement(Component as ReactElement, {
          key: material.id,
          'data-id':material.id,
          ...store.getConfiguration(material.id),
          onClick: () => {
            editorStore.setCurrentMaterial(material.id);
          },
        });
      })}
    </>
  );
}
