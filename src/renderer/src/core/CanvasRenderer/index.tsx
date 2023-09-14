import { useMemo } from 'react';
import MImage from '@/materials/MImage';
import MText from '@/materials/MText';
import MButton from '@/materials/MButton';
import { EMaterialName, IMaterialItem } from '@/materials/types';

const componentMap = {
  [EMaterialName.MButton]: MButton,
  [EMaterialName.MImage]: MImage,
  [EMaterialName.MText]: MText,
};

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  const renderedComponents = useMemo(() => {
    return materials.map((material) => {
      const Component = componentMap[material.name];
      if (Component) {
        return <Component key={material.id} />;
      } else {
        return <div key={material.id}>unknown material</div>;
      }
    });
  }, [materials]);

  return <>{renderedComponents}</>;
}
