import { TMaterialProps } from '../types/material';
import style from './style';

export type TTextAttribute = {
  text: string;
};

export type TTextProps = TMaterialProps<TTextAttribute>;

export const defaultProps: TTextProps = {
  style,
  attribute: {
    id: '',
    className: '',
    text: '这是一段文本，可在属性面板进行修改',
  },
  animations: [],
  events: [],
};
