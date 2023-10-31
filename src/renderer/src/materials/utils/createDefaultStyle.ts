import { DeepPartial } from '../types/utils';
import { defaultMaterialStyle } from '../default/style';
import { TStyle } from '../types/style';
import defaultsDeep from 'lodash/defaultsDeep';

export default function createDefaultStyle(style: DeepPartial<TStyle>) {
  return defaultsDeep(style, defaultMaterialStyle) as TStyle;
}
