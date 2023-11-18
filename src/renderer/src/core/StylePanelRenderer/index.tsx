import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Typography } from '@mui/material';
import editorStore from '@/store/editor';
import { EStyleType } from '@/materials/types/style';
import { IMaterial } from '@/materials/types/material';
import { LayoutPannel } from './LayoutPannel';
import { SizePannel } from './SizePannel';
import { BackgroundPannel } from './BackgroundPannel';
import { TextPannel } from './TextPannel';
import { EffectPannel } from './EffectPannel';
import { PositionPannel } from './PositionPannel';
import { GapPannel } from './GapPannel';
import { useMount, useSafeState, useUpdateEffect } from 'ahooks';
import { Fragment, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from '@/components/Fallback';
import { useSnapshot } from 'valtio';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@/components/Accordion';
import { subscribeKey } from 'valtio/utils';

const titleMap: Map<EStyleType, any> = new Map([
  [EStyleType.layout, '布局'],
  [EStyleType.position, '定位'],
  [EStyleType.gap, '间距'],
  [EStyleType.size, '尺寸'],
  [EStyleType.text, '文本'],
  [EStyleType.background, '背景'],
  [EStyleType.effect, '效果'],
]);

export default function StylePanelRenderer() {
  const editorSnap = useSnapshot(editorStore.state);
  const [property, setProperty] = useSafeState<
    IMaterial<any>['property'] | null
  >(
    editorSnap.currentMaterial
      ? editorStore.getProperty(editorSnap.currentMaterial!)
      : null
  );

  const AccordionDetailsContent = useCallback(
    (key: EStyleType) => {
      if (!property) return null;
      switch (key) {
        case EStyleType.layout:
          return (
            <LayoutPannel
              display={property.style.layout.display}
              onChange={(value) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  'layout.display',
                  value
                );
              }}
            />
          );
        case EStyleType.position:
          return (
            <PositionPannel
              {...property.style.position}
              onChange={(type, value) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  `position.${type}`,
                  value
                );
              }}
            />
          );
        case EStyleType.gap:
          return (
            <GapPannel
              {...property.style.gap}
              onChange={(gapType, value) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  'gap.' + gapType,
                  value
                );
              }}
            />
          );
        case EStyleType.size:
          return (
            <SizePannel
              {...property.style.size}
              onChange={(data) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  'size',
                  data
                );
              }}
            />
          );
        case EStyleType.text:
          return (
            <TextPannel
              {...property.style.text}
              onChange={(type, value) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  `text.${type}`,
                  value
                );
              }}
            />
          );
        case EStyleType.background:
          return (
            <BackgroundPannel
              {...property.style.background}
              onChange={(data) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  'background',
                  data
                );
              }}
            />
          );
        case EStyleType.effect:
          return (
            <EffectPannel
              {...property.style.effect}
              onChange={(data) => {
                editorStore.updateMaterialStyle(
                  editorSnap.currentMaterial!,
                  'effect',
                  data
                );
              }}
            />
          );
      }
    },
    [property, editorSnap.currentMaterial]
  );

  useUpdateEffect(() => {
    if (editorSnap.currentMaterial) {
      const property = editorStore.getProperty(editorSnap.currentMaterial!);
      setProperty(property);
    }
  }, [editorSnap.currentMaterial]);

  useMount(() =>
    subscribeKey(editorStore.materialList, 'value', (list) => {
      if (list.length === 0) {
        editorStore.setCurrentMaterial(null);
        setProperty(null);
      } else {
        const property = editorStore.getProperty(editorStore.state.currentMaterial!);
        setProperty(property);
      }
    })
  );

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Fragment>
        {property &&
          [...titleMap.keys()].map((key) => (
            <Accordion
              key={key}
              disableGutters
              elevation={0}
              square
              defaultExpanded
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={
                  <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />
                }
              >
                <Typography variant="subtitle2">
                  {titleMap.get(key as EStyleType)}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {AccordionDetailsContent(key)}
              </AccordionDetails>
            </Accordion>
          ))}
      </Fragment>
    </ErrorBoundary>
  );
}
