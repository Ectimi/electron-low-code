import { cloneElement } from 'react';
import { useDrag } from 'react-dnd';
import { styled, Card, Typography, Paper } from '@mui/material';
import {
  MaterialIndicatorItems,
  IMaterialIndicatorItem,
} from './materialIndicators';
import { EMaterialName } from '@/materials/types/material';

export interface IDropResult {
  materialName: EMaterialName;
}

const ScMaterialIndicatorBox = styled(Paper)({
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: '10px',
  width: ' var(--left-panel-width)',
  padding: 'var(--common-gap)',
  backgroundColor:'var(--background-color)'
});

const ScMaterialIndicatorItem = styled(Card)({
  width: '100px',
  height: '100px',
  padding: '16px',
  backgroundColor:'var(--card-background-color)',
  color:'var(--icon-stroke-color)',
  cursor: 'pointer',
});

const ScIconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
});

const MaterialIndicatorItem = function (props: IMaterialIndicatorItem) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'material',
    item: { materialName: props.materialName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <ScMaterialIndicatorItem
      ref={drag}
      style={{ opacity }}
    >
      <ScIconContainer>
        {cloneElement(props.icon, { sx: { fontSize: 40 } })}
      </ScIconContainer>
      <Typography variant="body2"  align="center">
        {props.text}
      </Typography>
    </ScMaterialIndicatorItem>
  );
};

export default function MaterialIndicatorBox() {
  return (
    <ScMaterialIndicatorBox elevation={5}>
      {MaterialIndicatorItems.map((item) => (
        <MaterialIndicatorItem key={item.materialName} {...item} />
      ))}
    </ScMaterialIndicatorBox>
  );
}
