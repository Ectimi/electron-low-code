import { ReactElement } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { EMaterialName } from '@/materials/types/material';
import { BoxIcon, ButtonIcon } from './icon';

export interface IMaterialIndicatorItem {
  materialName: string;
  icon: ReactElement;
  text: string;
}

const iconColor = '#4f7def';

export const MaterialIndicatorItems: IMaterialIndicatorItem[] = [
  {
    materialName: EMaterialName.Box,
    icon: <BoxIcon />,
    text: '容器组件',
  },
  {
    materialName: EMaterialName.Text,
    icon: <TextFieldsIcon htmlColor={iconColor} />,
    text: '文字组件',
  },
  {
    materialName: EMaterialName.Button,
    icon: <ButtonIcon />,
    text: '按钮组件',
  },
  {
    materialName: EMaterialName.Image,
    icon: <ImageIcon htmlColor={iconColor} />,
    text: '图片组件',
  },
];
