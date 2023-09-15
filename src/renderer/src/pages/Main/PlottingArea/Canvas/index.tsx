import { useSafeState } from 'ahooks';
import { useDrop } from 'react-dnd';
import { IDropResult } from '../../MaterialIndicatorBox';
import { styled } from '@mui/material';
import store from '@/store';
import CanvasRenderer from '@/core/CanvasRenderer';
import createMaterial, { IMaterialItem } from '@/materials/createMaterial';

interface IPosition {
  left: number;
  top: number;
}

interface ISize {
  width: number;
  height: number;
}

interface ICanvasProps {
  position?: IPosition;
  size?: ISize;
  backgroundColor?: string;
}

const ScCanvas = styled('div')((props: ICanvasProps) => {
  return {
    position: 'absolute',
    top: props.position?.top || 0 + 'px',
    left: props.position?.left || 0 + 'px',
    width: props.size?.width || 1920 + 'px',
    height: props.size?.height || 1080 + 'px',
    backgroundColor:props.backgroundColor || '#fff'
  };
});

export default function Canvas(props: ICanvasProps) {
  const snap = store.getSnapshot();
  const [position, setPosition] = useSafeState<IPosition>(
    props.position || { top: 0, left: 0 }
  );
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult) => {
      const materialItem = createMaterial(item.materialName)
     
      store.addMaterial(materialItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <ScCanvas
      {...props}
      position={position}
      size={{ width: snap.canvas.width, height: snap.canvas.height }}
      ref={drop}
    >
      <CanvasRenderer materials={snap.materialList as IMaterialItem[]} />
    </ScCanvas>
  );
}
