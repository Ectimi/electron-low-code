import { forwardRef, useRef } from 'react';
import { styled } from '@mui/material';
import Canvas from './Canvas';
import Guides, { GuidesProps } from '@scena/react-guides';
import { usePlotArea } from '@/hooks/usePlotArea';
import useZoomWithScroll from '@/hooks/useZoomWithScroll';
import { useUpdateEffect } from 'ahooks';

const ScPlotArea = styled('div')({
  position: 'relative',
  width: 'calc(100% - var(--left-panel-width) - var(--right-panel-width))',
  userSelect: 'none',
  backgroundColor: '#e6e6e6',
  overflow: 'hidden',
});

const ScIconBox = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
  backgroundColor: '#fff',
  zIndex: 1,
});

const ScHorizontalRuler = styled('div')({
  position: 'absolute',
  top: 0,
  left: '30px',
  width: 'calc(100% - 30px)',
  height: '30px',
  zIndex: 1,
});

const ScVerticalRuler = styled('div')({
  position: 'absolute',
  top: '30px',
  left: 0,
  width: '30px',
  height: 'calc(100% - 30px)',
  zIndex: 1,
});

const RulerGuides = forwardRef((props: GuidesProps, ref: any) => {
  const {
    zoom = 1,
    scrollPos = -300,
    type = 'horizontal',
    ...restPorps
  } = props;
  return (
    <Guides
      ref={ref}
      rulerStyle={{
        width: '100%',
        height: '100%',
      }}
      type={type}
      displayDragPos={true}
      displayGuidePos={true}
      useResizeObserver={true}
      backgroundColor="#fff"
      textColor="#000"
      zoom={zoom}
      scrollPos={scrollPos}
      {...restPorps}
    />
  );
});

export default function PlotArea() {
  const [plotAreaRef, canvasPos] = usePlotArea({
    onLooseSpace(el) {
      el.style.cursor = 'default';
    },
    onPressSpace(el) {
      el.style.cursor = 'grab';
    },
  });
  const horizonalGuidesRef = useRef<any>();
  const verticalGuidesRef = useRef<any>();
  const zoom = useZoomWithScroll(plotAreaRef);

  useUpdateEffect(() => {
    console.log('zoom', zoom);
  }, [zoom]);

  return (
    <ScPlotArea ref={plotAreaRef}>
      <ScIconBox>
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
      </ScIconBox>
      <ScHorizontalRuler>
        <RulerGuides ref={horizonalGuidesRef} zoom={zoom} />
      </ScHorizontalRuler>
      <ScVerticalRuler>
        <RulerGuides ref={verticalGuidesRef} type="vertical" zoom={zoom} />
      </ScVerticalRuler>

      <Canvas
        position={{ top: 330, left: 330 }}
        translate={canvasPos!}
        scale={zoom}
      />
    </ScPlotArea>
  );
}
