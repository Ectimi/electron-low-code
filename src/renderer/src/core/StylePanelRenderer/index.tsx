import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  Stack,
  styled,
} from '@mui/material';
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
import { useSafeState, useUpdateEffect } from 'ahooks';
import { Fragment, useMemo } from 'react';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  '.MuiButtonBase-root': {
    minHeight: '30px',
  },
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '8px 20px',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontSize: '14px',
});

const titleMap: Map<EStyleType, any> = new Map([
  [EStyleType.layout, '布局'],
  [EStyleType.position, '定位'],
  [EStyleType.gap, '间隔'],
  [EStyleType.size, '尺寸'],
  [EStyleType.text, '文本'],
  [EStyleType.background, '背景'],
  [EStyleType.effect, '效果'],
]);

export default function StylePanelRenderer() {
  const [updateKey, forceUpdate] = useSafeState(0);
  const editorSnap = editorStore.getSnapshot();
  const property = useMemo<IMaterial['property'] | null>(() => {
    return editorSnap.currentMaterial
      ? editorStore.getConfiguration(editorSnap.currentMaterial!)!
      : null;
  }, [editorSnap.currentMaterial]);

  useUpdateEffect(() => {
    forceUpdate((pre) => pre + 1);
  }, [editorSnap.currentMaterial]);

  return (
    <Fragment key={updateKey}>
      {editorSnap.currentMaterial && property ? (
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
              {key === EStyleType.layout && (
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
              )}

              {key === EStyleType.position && (
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
              )}

              {key === EStyleType.gap && (
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
              )}

              {key === EStyleType.size && (
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
              )}

              {key === EStyleType.text && (
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
              )}

              {key === EStyleType.background && (
                <BackgroundPannel {...property.style.background} />
              )}

              {key === EStyleType.effect && (
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
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Stack
          sx={{ height: '100%' }}
          direction={'row'}
          alignItems="center"
          justifyContent="center"
        >
          请在画布中选择组件
        </Stack>
      )}
    </Fragment>
  );
}
