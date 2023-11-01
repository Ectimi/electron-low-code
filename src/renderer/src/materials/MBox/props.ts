import { TMaterialProps } from '../types/material';
import style from './style';

export type TBoxProps = TMaterialProps;

export const defaultProps: TBoxProps = {
  style,
  attribute: {
    id: '',
    className: '',
  },
  animations: [],
  events: [],
};
