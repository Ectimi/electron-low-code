import { IMaterialItem } from 'root/renderer/src/materials/utils/createMaterial';
import editorStore from '@/store/editor';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  return (
    <>
      {materials.map((material) => {
        const Component: any = material.component;

        return (
          <Component
            key={material.id}
            data-id={material.id}
            onClick={() => editorStore.setCurrentMaterial(material.id)}
            {...material.property}
          />
        );
      })}
    </>
  );
}
