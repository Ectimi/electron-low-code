import { ETextPos, TMaterialButton } from '../types/material';
import { DeepPartial } from '../types/utils';
import { defaultBoxStyle, defaultTextStyle } from '../default/style';
import { deepMerge } from '@/utils';

export type TButtonProperty = TMaterialButton['property'];

export type TButtonProps = Omit<TMaterialButton, 'id' | 'name'>;

export const presetStyle: DeepPartial<TButtonProperty['style']> = deepMerge(
  {
    ...defaultBoxStyle,
    ...defaultTextStyle,
  },
  {
    basic: {
      width: 100,
      height: 35,
    },
    background: {
      backgroundColor: '#3f7ef7',
    },
    border: {
      borderRadius: 4,
    },
    font: {
      color: '#fff',
    },
  }
);

export const defaultProps: TButtonProps = {
  property: {
    style: presetStyle as TButtonProperty['style'],
    animations: [],
    events: [],
  },
  custom: {
    textPosition: ETextPos.center,
  },
};
