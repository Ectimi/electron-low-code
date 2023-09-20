import { TBoxStyle } from '@/materials/types/style';

export const enum EFieldType {
  TextInput,
  NumberInput,
  Checkbox,
  ColorPicker,
  ImagePicker,
  Select,
}

type TStyleType = 'basic' | 'boxShadow' | 'background' | 'border';
type TStyleField<T> = { name: keyof T; label: string; type: EFieldType };

type TBasicFields = TStyleField<TBoxStyle['basic']>[];
type TBoxShadowFields = TStyleField<TBoxStyle['boxShadow']>[];
type TBackgroundPosition = TStyleField<TBoxStyle['background']>[];
type TBorderFields = TStyleField<TBoxStyle['border']>[];

type TStyleFieldMap = Record<
  TStyleType,
  TBasicFields | TBoxShadowFields | TBackgroundPosition | TBorderFields
>;

const StyleFieldMap: TStyleFieldMap = {
  basic: [
    { name: 'width', label: 'Width', type: EFieldType.NumberInput },
    { name: 'height', label: 'Height', type: EFieldType.NumberInput },
    { name: 'margin', label: 'Margin', type: EFieldType.NumberInput },
    { name: 'padding', label: 'Padding', type: EFieldType.NumberInput },
    { name: 'opacity', label: 'Opacity', type: EFieldType.NumberInput },
  ],
  boxShadow: [
    { name: 'boxShadowInset', label: 'Inset', type: EFieldType.Select },
    {
      name: 'boxShadowOffsetX',
      label: 'H-Shadow',
      type: EFieldType.NumberInput,
    },
    {
      name: 'boxShadowOffsetY',
      label: 'V-Shadow',
      type: EFieldType.NumberInput,
    },
    {
      name: 'boxShadowBlurRadius',
      label: 'Blur',
      type: EFieldType.NumberInput,
    },
    {
      name: 'boxShadowSpreadRadius',
      label: 'Spread',
      type: EFieldType.NumberInput,
    },
    {
      name: 'boxShadowColor',
      label: 'Color',
      type: EFieldType.ColorPicker,
    },
  ],
  background: [
    {
      name: 'backgroundColor',
      label: 'Color',
      type: EFieldType.ColorPicker,
    },
    {
      name: 'backgroundImage',
      label: 'Image',
      type: EFieldType.ImagePicker,
    },
    {
      name: 'backgroundSize',
      label: 'Size',
      type: EFieldType.NumberInput,
    },
    {
      name: 'backgroundRepeat',
      label: 'Repeat',
      type: EFieldType.Select,
    },
    {
      name: 'backgroundPositionX',
      label: 'X-Position',
      type: EFieldType.NumberInput,
    },
    {
      name: 'backgroundPositionY',
      label: 'Y-Position',
      type: EFieldType.NumberInput,
    },
  ],
  border: [
    { name: 'borderWidth', label: 'Width', type: EFieldType.NumberInput },
    {
      name: 'borderRadius',
      label: 'Color',
      type: EFieldType.NumberInput,
    },
    { name: 'borderStyle', label: 'Style', type: EFieldType.Select },
    {
      name: 'borderColor',
      label: 'Color',
      type: EFieldType.ColorPicker,
    },
  ],
};

export default StyleFieldMap;
