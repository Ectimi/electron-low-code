import { IMaterialItem } from 'root/renderer/src/materials/utils/createMaterial';
import editorStore from '@/store/editor';
import { useMemo } from 'react';
import { EMaterialName } from '@/materials/types/material';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  const structureMaterials = useMemo(() => {
    const standaloneMaterials = materials.filter((m) => m.parentId === null);
    const childMaterials = materials.filter((m) => m.parentId !== null);

    childMaterials.forEach((m1) => {
      childMaterials.forEach((m2) => {
        if (m1.parentId === m2.id && m2.name === EMaterialName.Box) {
          const children = m2.children || [];
          if (children.some((item) => item.id === m1.id)) {
            const index = children.findIndex((item) => item.id === m1.id);
            children.splice(index, 1);
          }
          children.push(m1);
          m2.children = children;
        }
      });
    });
    childMaterials.map((child) => {
      standaloneMaterials.forEach((s) => {
        if (child.parentId === s.id && s.name === EMaterialName.Box) {
          const children = s.children || [];
          if (children.some((item) => item.id === child.id)) {
            const index = children.findIndex((item) => item.id === child.id);
            children.splice(index, 1);
          }
          children.push(child);
          s.children = children;
        }
      });
    });

    return standaloneMaterials;
  }, [materials]);

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
      {/* {materials.map((material) => {
        const Component: any = material.component;

        return (
          <Component
            key={material.id}
            data-id={material.id}
            onClick={() => editorStore.setCurrentMaterial(material.id)}
            id={material.id}
            {...material.property}
          />
        );
      })} */}
    </>
  );
}
