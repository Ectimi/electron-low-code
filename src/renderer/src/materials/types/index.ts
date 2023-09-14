import { DeepPartial } from './utils';

export const enum EMaterialName {
  MImage = 'MImage',
  MText = 'MText',
  MButton = 'MButton',
}

export type TBackgroundPosition = number | string;
export type TBackgroundRepeat =
  | 'repeat-x'
  | 'repeat-y'
  | 'repeat'
  | 'space'
  | 'round'
  | 'no-repeat';

export type TBorderStyle = 'dashed' | 'dotted' | 'goove';

export type TFontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | number;

export interface IBoxStyle {
  basic: {
    width: number;
    height: number;
    margin: [number, number?, number?, number?];
    padding: [number, number?, number?, number?];
    color: number;
    opacity: number;
  };

  boxShadow: {
    boxShadowInset: boolean;
    boxShadowOffsetX: number;
    boxShadowOffsetY: number;
    boxShadowBlurRadius: number;
    boxShadowSpreadRadius: number;
    boxShadowColor: string;
  };

  background: {
    backgroundColor: string;
    backgroundImage: string;
    backgroundSize: string;
    backgroundRepeat: TBackgroundRepeat;
    backgroundPositionX: TBackgroundPosition;
    backgroundPositionY: TBackgroundPosition;
  };

  border: {
    borderStyle: TBorderStyle;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
  };
}

export interface ITextStyle {
  font: {
    fontSize: number;
    fontStyle: string;
    fontWeight: TFontWeight;
  };
}

export interface IStyle extends IBoxStyle, ITextStyle {}

export interface IMaterialItem {
  id: string;
  name: EMaterialName;
  
}

export interface IMaterialProps {
  style?: DeepPartial<IStyle>;
}
