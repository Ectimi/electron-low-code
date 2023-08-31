import MImage from '@/materials/MImage';
import MText from '@/materials/MText';
import MButton from '@/materials/MButton';
import { EMaterialName, IMaterialItem } from '@/materials/types';

export default function CanvasRenderer(props: { materials: IMaterialItem[] }) {
  const { materials } = props;

  return (
    <>
      {materials.map((material) => {
        const Component = () => {
          switch (material.name) {
            case EMaterialName.MButton:
              return <MButton />;
            case EMaterialName.MImage:
              return <MImage />;
            case EMaterialName.MText:
              return <MText />;
            default:
              return <div>nnkonw material</div>;
          }
        };
        return <Component key={material.id} />;
      })}
    </>
  );
}
