import { useMemo, useRef } from 'react';
import { useSize } from 'ahooks';
import store from '@/store';
import { styled } from '@mui/material';
import Canvas from './Canvas';
import Scaleplate from '@/components/Scaleplate';
import { roundToNearest } from '@/materials/utils';

const IconBox = styled('div')({
  position: 'sticky',
  left: 0,
  width: '24px',
  height: '24px',
  background: '#fff',
  zIndex: 1,
});

const HorizontalScaleplate = styled('div')({
  position: 'sticky',
  top: 0,
  display: 'flex',
  zIndex: 1,
});

const VerticalScaleplate = styled(Scaleplate)({
  position: 'sticky',
  top: '24px',
  left: 0,
  zIndex: 1,
});

const extendLength = 300;
const barWidth = 24;
const tickWidth = 1;

const ScPlottingArea = styled('div')({
  position: 'relative',
  width: 'calc(100% - var(--left-panel-width) - var(--right-panel-width))',
  backgroundColor: '#e6e6e6',
  overflow: 'auto',
});

export default function PlottingArea() {
  const plottingAreaRef = useRef<HTMLDivElement>(null);
  const size = useSize(plottingAreaRef);
  const snap = store.getSnapshot();

  const scaleplateMark = useMemo(() => {
    const arr = [
      snap.canvas.width,
      snap.canvas.height,
      size?.height || 0,
      size?.width || 0,
    ];

    const max = roundToNearest(Math.max(...arr)) + extendLength;
    const min = -extendLength;

    return { max, min };
  }, [snap.canvas.width, snap.canvas.height, size]);

  return (
    <ScPlottingArea ref={plottingAreaRef}>
      <HorizontalScaleplate>
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
        <Scaleplate
          max={scaleplateMark.max}
          min={scaleplateMark.min}
          barWidth={barWidth}
          tickWidth={tickWidth}
        />
      </HorizontalScaleplate>

      <VerticalScaleplate
        dir="column"
        max={scaleplateMark.max}
        min={scaleplateMark.min}
        barWidth={barWidth}
        tickWidth={tickWidth}
      />
      <Canvas
        position={{
          top: extendLength + barWidth + tickWidth,
          left: extendLength + barWidth + tickWidth,
        }}
      />
    </ScPlottingArea>
  );
}
