import { useSnapshot } from 'valtio';
import { store, addMaterial } from '@/store';
import { useDrop } from 'react-dnd';
import { Paper } from '@mui/material';
import { IMaterialItem } from '@/materials/types';
import { IDropResult } from '../MaterialIndicatorBox';
import CanvasRenderer from '@/core/CanvasRenderer';
import { nanoid } from 'nanoid';
import './index.less'


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
    <Paper className='canvas' ref={drop} elevation={3}>
      <CanvasRenderer materials={snap.materialList as IMaterialItem[]} />
    </Paper>
  );
}
