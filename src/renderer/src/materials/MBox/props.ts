import { ReactNode } from 'react';
import { TMaterialProps } from '../types/material';
import style from './style';
import { IMaterialItem } from '../utils/createMaterial';

export type TBoxProps = TMaterialProps & { id?: string,children?:IMaterialItem[] };

export const defaultProps: TBoxProps = {
  style,
  attribute: {
    id: '',
    className: '',
  },
  animations: [],
  events: [],
};
