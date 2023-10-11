import { TMaterialProps } from '../types/material';
import { DeepPartial } from '../types/utils';
import { defaultMaterialStyle } from '../default/style';
import { TStyle } from '../types/style';
import defaultsDeep from 'lodash/defaultsDeep';

export const presetStyle: TStyle = defaultsDeep(
  {
    layout: {
      display: 'flex',
      flexLayout: {
        container: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    size: {
      width: 100,
      height: 35,
    },
    background: {
      backgroundColor: '#3f7ef7',
    },
    font: {
      color: '#fff',
    },
    effect: {
      cursor: 'pointer',
    },
  } as DeepPartial<TStyle>,
  defaultMaterialStyle
);

export const defaultProps: TMaterialProps = {
  style: presetStyle,
  animations: [],
  events: [],
};
