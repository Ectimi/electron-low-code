import { useDrop } from 'react-dnd';
import { IDropResult } from '../../MaterialIndicatorBox';
import { styled } from '@mui/material';
import store from '@/store';
import CanvasRenderer from '@/core/CanvasRenderer';
import createMaterial, { IMaterialItem } from '@/materials/createMaterial';

export interface IPosition {
  left: number;
  top: number;
}

interface ISize {
  width: number;
  height: number;
}

interface ICanvasProps {
  position: IPosition;
  translate: { x: number; y: number };
  scale?:number;
  size?: ISize;
  backgroundColor?: string;
}

const ScCanvas = styled('div')((props: ICanvasProps) => {
  return {
    position: 'absolute',
    top: props.position.top || 0 + 'px',
    left: props.position.left || 0 + 'px',
    width: props.size?.width || 1920 + 'px',
    height: props.size?.height || 1080 + 'px',
    backgroundColor: props.backgroundColor || '#fff',
    transform: `translate(${props.translate.x}px,${props.translate.y}px) scale(${props.scale})`,
    transformOrigin: '0 0 ',
  };
});

export default function Canvas(props: ICanvasProps) {
  const {
    position = { top: 0, left: 0 },
    translate = { x: 0, y: 0 },
    scale = 1,
    ...restProps
  } = props;
  const snap = store.getSnapshot();
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult) => {
      const materialItem = createMaterial(item.materialName);

      store.addMaterial(materialItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <ScCanvas
      {...restProps}
      ref={drop}
      position={position}
      translate={translate as any}
      scale={scale}
      size={{ width: snap.canvas.width, height: snap.canvas.height }}
    >
      <CanvasRenderer materials={snap.materialList as IMaterialItem[]} />
    </ScCanvas>
  );
}
