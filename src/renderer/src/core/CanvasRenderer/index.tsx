import { IMaterialItem } from 'root/renderer/src/materials/utils/createMaterial';
import editorStore from '@/store/editor';
import { useMemo } from 'react';
import materialListToTree from '@/utils/materialListToTree';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  const structureMaterials = useMemo(
    () => materialListToTree(materials),
    [materials]
  );

  return (
    <>
      {structureMaterials.map((material) => {
        const Component: any = material.component;

        return (
          <Component
            key={material.id}
            data-id={material.id}
            onClick={() => editorStore.setCurrentMaterial(material.id)}
            id={material.id}
            children={material.children}
            {...material.property}
          />
        );
      })}
    </>
  );
}
