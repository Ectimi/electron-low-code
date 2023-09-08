import { useSnapshot } from 'valtio';
import { store, addMaterial } from '@/store';
import { useDrop } from 'react-dnd';
import { styled } from '@mui/material';
import { IMaterialItem } from '@/materials/types';
import { IDropResult } from '../MaterialIndicatorBox';
import CanvasRenderer from '@/core/CanvasRenderer';
import { nanoid } from 'nanoid';
import Scaleplate from '@/components/Scaleplate';
import './index.less';

const IconBox = styled('div')({
  width: '24px',
  height: '24px',
  background: '#fff',
});

const TopScaleplte = styled('div')({
  display: 'flex',
});

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
      <TopScaleplte>
        <IconBox>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9065"
            width={24}
          >
            <path
              d="M896 469.333333h-45.653333A341.333333 341.333333 0 0 0 554.666667 173.653333V128a42.666667 42.666667 0 0 0-85.333334 0v45.653333A341.333333 341.333333 0 0 0 173.653333 469.333333H128a42.666667 42.666667 0 0 0 0 85.333334h45.653333A341.333333 341.333333 0 0 0 469.333333 850.346667V896a42.666667 42.666667 0 0 0 85.333334 0v-45.653333A341.333333 341.333333 0 0 0 850.346667 554.666667H896a42.666667 42.666667 0 0 0 0-85.333334z m-170.666667 85.333334h38.826667A256 256 0 0 1 554.666667 764.16V725.333333a42.666667 42.666667 0 0 0-85.333334 0v38.826667A256 256 0 0 1 259.84 554.666667H298.666667a42.666667 42.666667 0 0 0 0-85.333334h-38.826667A256 256 0 0 1 469.333333 259.84V298.666667a42.666667 42.666667 0 0 0 85.333334 0v-38.826667A256 256 0 0 1 764.16 469.333333H725.333333a42.666667 42.666667 0 0 0 0 85.333334z m-213.333333-85.333334a42.666667 42.666667 0 1 0 42.666667 42.666667 42.666667 42.666667 0 0 0-42.666667-42.666667z"
              p-id="9066"
              fill="#8a8a8a"
            ></path>
          </svg>
        </IconBox>
        <Scaleplate />
      </TopScaleplte>

      <Scaleplate dir="column" />
      <CanvasRenderer materials={snap.materialList as IMaterialItem[]} />
    </div>
  );
}
