import { useDrag } from 'react-dnd';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { ReactElement, cloneElement } from 'react';
import { Card, Typography } from '@mui/material';

import './index.less';
import { EMaterialName } from '@/core/types/material';

interface MaterialIndicatorItem {
  materialName: string;
  icon: ReactElement;
  text: string;
}

export interface IDropResult {
  materialName: EMaterialName;
}

const MaterialIndicatorItems: MaterialIndicatorItem[] = [
  {
    materialName: EMaterialName.MImage,
    icon: <ImageIcon />,
    text: '图片组件',
  },
  {
    materialName: EMaterialName.MText,
    icon: <TextFieldsIcon />,
    text: '文件组件',
  },
];

const MaterialIndicatorItem = function (props: MaterialIndicatorItem) {
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

export default function MaterialBox() {
  return (
    <div className="material-indicator-box">
      {MaterialIndicatorItems.map((item) => (
        <MaterialIndicatorItem key={item.materialName} {...item} />
      ))}
    </div>
  );
}
