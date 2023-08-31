import { cloneElement } from 'react';
import { useDrag } from 'react-dnd';
import { Card, Typography, Paper } from '@mui/material';
import { EMaterialName } from '@/materials/types';
import {
  MaterialIndicatorItems,
  IMaterialIndicatorItem,
} from './materialIndicators';
import './index.less';

export interface IDropResult {
  materialName: EMaterialName;
}

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
    <Card ref={drag} style={{ opacity }} className="material-indicator-item">
      <div className="icon-container">
        {cloneElement(props.icon, { sx: { fontSize: 40 } })}
      </div>
      <Typography variant="body2" color="text.secondary" align="center">
        {props.text}
      </Typography>
    </Card>
  );
};

export default function MaterialIndicatorBox() {
  return (
    <Paper className="material-indicator-box" elevation={5}>
      {MaterialIndicatorItems.map((item) => (
        <MaterialIndicatorItem key={item.materialName} {...item} />
      ))}
    </Paper>
  );
}
