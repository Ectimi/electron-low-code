import { TMaterialProps } from '../types/material';
import style from './style';

export type TImageAttribute = {
  objectFix: 'contain' | 'fill' | 'cover' | 'scale-down' | 'none';
  url:string
};

export type TImageProps = TMaterialProps<TImageAttribute>;

export const defaultProps: TImageProps = {
  style,
  attribute: {
    id: '',
    className: '',
    objectFix:'contain',
    url:''
  },
  animations: [],
  events: [],
};
