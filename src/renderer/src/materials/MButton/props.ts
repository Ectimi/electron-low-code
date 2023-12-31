import { TMaterialProps } from '../types/material';
import style from './style';

export type TButtonAttribute = {
  text: string;
};

export type TButtonProps = TMaterialProps<TButtonAttribute>;

export const defaultProps: TButtonProps = {
  style,
  attribute: {
    id: '',
    className: '',
    text: '按钮',
  },
  animations: [],
  events: [],
};
