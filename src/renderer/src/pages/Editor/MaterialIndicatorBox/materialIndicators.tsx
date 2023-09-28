import { ReactElement } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { SvgIcon } from '@mui/material';
import { EMaterialName } from '@/materials/types/material';

export interface IMaterialIndicatorItem {
  materialName: string;
  icon: ReactElement;
  text: string;
}

const iconColor = '#ff8e3c';

const ButtonIcon = () => (
  <SvgIcon fontSize='large'>
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="9008"
      width="300"
      height="300"
    >
      <path
        d="M389.12 671.36a90.24 90.24 0 0 0 37.76-80 90.24 90.24 0 0 0-18.56-58.88 88.32 88.32 0 0 0-54.4-28.8 90.24 90.24 0 0 0 42.24-29.44 85.76 85.76 0 0 0 15.36-51.84 82.56 82.56 0 0 0-28.8-64 124.16 124.16 0 0 0-83.2-24.96H134.4v360.96h165.12a161.28 161.28 0 0 0 89.6-23.04zM192 376.96h96a87.68 87.68 0 0 1 53.76 12.8 45.44 45.44 0 0 1 16.64 39.04 53.12 53.12 0 0 1-16.64 42.88 94.08 94.08 0 0 1-55.04 12.8H192z m0 270.08V529.92h101.76a95.36 95.36 0 0 1 58.24 14.08 54.4 54.4 0 0 1 19.2 46.72 49.28 49.28 0 0 1-24.32 45.44 118.4 118.4 0 0 1-55.04 10.88zM503.04 627.2a71.68 71.68 0 0 0 14.08 48 64 64 0 0 0 49.28 17.28h42.88v-44.16H576a22.4 22.4 0 0 1-14.72-5.12 28.16 28.16 0 0 1-4.48-16V475.52h60.16v-44.16h-60.8V346.24l-53.12 22.4v64H454.4v44.16h48.64zM712.96 535.04a78.72 78.72 0 0 1 21.76-49.92 55.04 55.04 0 0 1 39.68-16c40.96 0 64 22.4 64 64v156.8h53.76V531.2c0-71.68-33.28-107.52-97.92-107.52a93.44 93.44 0 0 0-44.16 10.24 114.56 114.56 0 0 0-34.56 29.44v-32h-56.32v261.12h53.76z"
        fill={iconColor}
        p-id="9009"
      ></path>
      <path
        d="M102.4 870.4h819.2A102.4 102.4 0 0 0 1024 768V256a102.4 102.4 0 0 0-102.4-102.4H102.4A102.4 102.4 0 0 0 0 256v512a102.4 102.4 0 0 0 102.4 102.4zM64 256a38.4 38.4 0 0 1 38.4-38.4h819.2a38.4 38.4 0 0 1 38.4 38.4v512a38.4 38.4 0 0 1-38.4 38.4H102.4A38.4 38.4 0 0 1 64 768z"
        fill={iconColor}
        p-id="9010"
      ></path>
    </svg>
  </SvgIcon>
);

export const MaterialIndicatorItems: IMaterialIndicatorItem[] = [
  {
    materialName: EMaterialName.MImage,
    icon: <ImageIcon htmlColor={iconColor} />,
    text: '图片组件',
  },
  {
    materialName: EMaterialName.MText,
    icon: <TextFieldsIcon htmlColor={iconColor} />,
    text: '文字组件',
  },
  {
    materialName: EMaterialName.MButton,
    icon: <ButtonIcon />,
    text: '按钮组件',
  },
];