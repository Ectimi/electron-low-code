import { TAllStyle, TButtonStyle } from './style';

export const enum EMaterialName {
  MImage = 'MImage',
  MText = 'MText',
  MButton = 'MButton',
}

export const enum ETextPos {
  'left' = 'left',
  'center' = 'center',
  'right' = 'right',
}

export interface IMaterial<Style = TAllStyle, Custom = any> {
  id: string;
  name: EMaterialName;
  property: {
    style: Style;
    animations: any;
    events: any;
  };
  custom: Custom;
}

export type TMaterialButton = IMaterial<
  TButtonStyle,
  {
    textPosition: ETextPos;
  }
>;
