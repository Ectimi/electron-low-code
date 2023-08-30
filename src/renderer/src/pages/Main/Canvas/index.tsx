import { useEffect, type CSSProperties } from 'react';
import { useSnapshot } from 'valtio';
import { store,addMaterial } from '@/store';
import { useDrop } from 'react-dnd';
import { IMaterialItem } from '@/core/types/material';
import { IDropResult } from '../MaterialBox';
import Renderer from '@/core/renderer';

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  background: 'green',
};

export default function Canvas() {
  const snap = useSnapshot(store);
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult) => {
      const materialItem: IMaterialItem = { name: item.materialName };
      addMaterial(materialItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} style={{ ...style }}>
      <Renderer materials={snap.materialList as IMaterialItem[]} />
    </div>
  );
}
