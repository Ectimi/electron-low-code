import { ReactElement, cloneElement } from 'react';
import { IMaterialItem } from 'root/renderer/src/materials/utils/createMaterial';
import store from '@/store/editor';
import editorStore from '@/store/editor';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  return (
    <>
      {materials.map((material) => {
        const fn = material.component;
        const Component = fn({ ...material.property });

        return cloneElement(Component as ReactElement, {
          key: material.id,
          'data-id':material.id,
          ...store.getProperty(material.id),
          onClick: () => {
            editorStore.setCurrentMaterial(material.id);
          },
        });
      })}
    </>
  );
}
