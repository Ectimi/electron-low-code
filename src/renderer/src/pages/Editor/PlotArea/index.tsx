import { Box, styled } from '@mui/material';
import Canvas from './Canvas';
import { usePlotArea } from '@/hooks/usePlotArea';
import useZoomWithScroll from '@/hooks/useZoomWithScroll';
import { useMount, useSafeState, useUpdateEffect } from 'ahooks';
import { ActionTool } from './ActionTool';
import { subscribeKey } from 'valtio/utils';
import editorStore, { IEditorStore } from 'root/renderer/src/store/editor';
import { useSnapshot } from 'valtio';

const PlotAreaBox = styled('div')({
  position: 'relative',
  width: 'calc(100% - var(--left-panel-width) - var(--right-panel-width))',
  userSelect: 'none',
  backgroundColor: '#e6e6e6',
  overflow: 'hidden',
});

const HelperBox = styled(Box)(
  (props: { x: number; y: number; scale: number }) => ({
    position: 'absolute',
    top: '330px',
    left: '330px',
    transform: `translate(${props.x}px,${props.y}px) scale(${props.scale})`,
    width: '1920px',
    height: '1080px',
    pointerEvents: 'none',
  })
);

const IndicatorBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  border: `3px solid ${theme.palette.primary.dark}`,
}));

const IndicatorLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '-3px',
  top: '-24px',
  padding: '2px 10px',
  fontSize: '12px',
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
}));

export default function PlotArea() {
  const snap = useSnapshot(editorStore.state);
  const [indicator, setIndicator] = useSafeState({
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    width: '0px',
    height: '0px',
  });
  const [indicatorLabel, setIndicatorLabel] = useSafeState('');
  const [plotAreaRef, canvasPos] = usePlotArea({
    onLooseSpace(el) {
      el.style.cursor = 'default';
    },
    onPressSpace(el) {
      el.style.cursor = 'grab';
    },
  });
  const zoom = useZoomWithScroll(plotAreaRef);

  useUpdateEffect(() => {
    console.log('zoom', zoom);
  }, [zoom]);

  useMount(() => {
    const updateIndicator = (materialId: IEditorStore['currentMaterial']) => {
      if (materialId) {
        const ele = document.querySelector(
          `[data-id=${materialId}]`
        ) as HTMLElement;
        const top = ele?.offsetTop + 'px';
        const left = ele?.offsetLeft + 'px';
        const { right, bottom } = getComputedStyle(ele!);
        const width = ele.offsetWidth + 'px';
        const height = ele.offsetHeight + 'px';
        setIndicator({ top, right, bottom, left, width, height });
        setIndicatorLabel(materialId.split('__')[0]);
      }
    };
    // subscribeKey(editorStore.state, 'currentMaterial', (materialId) => {
    //   setTimeout(() => updateIndicator(materialId));
    // });
    subscribeKey(editorStore.materialList, 'value', (value) => {
      console.log('value',value);
      
      // setTimeout(() => updateIndicator(editorStore.state.currentMaterial));
    });
  });

  return (
    <PlotAreaBox ref={plotAreaRef}>
      <ActionTool />

      <Canvas
        position={{ top: 330, left: 330 }}
        translate={canvasPos!}
        scale={zoom}
      />

      <HelperBox x={canvasPos.x} y={canvasPos.y} scale={zoom}>
        {parseFloat(indicator.width) > 0 && (
          <IndicatorBox sx={indicator}>
            <IndicatorLabel>{indicatorLabel}</IndicatorLabel>
          </IndicatorBox>
        )}
      </HelperBox>
    </PlotAreaBox>
  );
}
