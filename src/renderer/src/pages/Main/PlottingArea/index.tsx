import { useMemo, useRef } from 'react';
import { useSize } from 'ahooks';
import store from '@/store';
import { styled } from '@mui/material';
import Canvas from './Canvas';
import Guides from '@scena/react-guides';

const extendLength = 300;
const barWidth = 24;
const tickWidth = 1;

const ScPlottingArea = styled('div')({
  position: 'relative',
  width: 'calc(100% - var(--left-panel-width) - var(--right-panel-width))',
  backgroundColor: '#e6e6e6',
  overflow: 'auto',
});

const ScHorizontalRuler = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '30px',
});

const ScVerticalRuler = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '30px',
  height: '100%',
});

export default function PlottingArea() {
  const horizonalGuidesRef = useRef<any>();
  const verticalGuidesRef = useRef<any>();
 
  return (
    <ScPlottingArea>
      <ScHorizontalRuler>
        <Guides
          ref={horizonalGuidesRef}
          type="horizontal"
          rulerStyle={{
            left: '30px',
            width: 'calc(100% - 30px)',
            height: '100%',
          }}
          displayDragPos={true}
          displayGuidePos={true}
          useResizeObserver={true}
          zoom={1}
        />
      </ScHorizontalRuler>
      <ScVerticalRuler>
        <Guides
          ref={verticalGuidesRef}
          type="vertical"
          rulerStyle={{
            top: '30px',
            height: 'calc(100% - 30px)',
            width: '100%',
          }}
          displayDragPos={true}
          displayGuidePos={true}
          useResizeObserver={true}
        />
      </ScVerticalRuler>

      <Canvas
        position={{
          top: extendLength + barWidth + tickWidth,
          left: extendLength + barWidth + tickWidth,
        }}
      />
    </ScPlottingArea>
  );
}
