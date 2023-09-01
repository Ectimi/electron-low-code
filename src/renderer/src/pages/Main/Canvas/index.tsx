import { useSnapshot } from 'valtio';
import { store, addMaterial } from '@/store';
import { useDrop } from 'react-dnd';
import { IMaterialItem } from '@/materials/types';
import { IDropResult } from '../MaterialIndicatorBox';
import CanvasRenderer from '@/core/CanvasRenderer';
import { nanoid } from 'nanoid';
import './index.less';
import Scaleplate from '@/components/Scaleplate';

export default function Canvas() {
  const snap = useSnapshot(store);
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult) => {
      const materialItem: IMaterialItem = {
        id: nanoid(),
        name: item.materialName,
        properties: {
          style: {},
        },
      };
      addMaterial(materialItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className="canvas" ref={drop}>
      <Scaleplate />
      <CanvasRenderer materials={snap.materialList as IMaterialItem[]} />
    </div>
  );
}
