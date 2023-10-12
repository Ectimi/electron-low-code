import { useMemo } from 'react';
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
import { FontPannel } from './FontPannel';
import { EffectPannel } from './EffectPannel';
import { PositionPannel } from './PositionPannel';
import { GapPannel } from './GapPannel';

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
  [EStyleType.position, '位置'],
  [EStyleType.gap, '间隔'],
  [EStyleType.size, '尺寸'],
  [EStyleType.font, '字体'],
  [EStyleType.background, '背景'],
  [EStyleType.effect, '效果'],
]);

export default function StylePanelRenderer() {
  const editorSnap = editorStore.getSnapshot();
  const property = useMemo<IMaterial['property'] | null>(() => {
    return editorSnap.currentMaterial
      ? editorStore.getConfiguration(editorSnap.currentMaterial!)!
      : null;
  }, [editorSnap.currentMaterial]);

  return (
    <>
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
              {key === EStyleType.size && <SizePannel />}
              {key === EStyleType.background && <BackgroundPannel />}
              {key === EStyleType.font && <FontPannel />}
              {key === EStyleType.effect && <EffectPannel />}
              {key === EStyleType.position && <PositionPannel />}
              {key === EStyleType.gap && <GapPannel onChange={(value)=>{console.log();
              }}/>}
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
    </>
  );
}
