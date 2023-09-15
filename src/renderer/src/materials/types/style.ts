export type TBackgroundPosition = number | string;

export type TBackgroundRepeat =
  | 'repeat-x'
  | 'repeat-y'
  | 'repeat'
  | 'space'
  | 'round'
  | 'no-repeat';

export type TBackgrounSize =
  | 'auto'
  | 'cover'
  | 'contain'
  | number
  | [number | string, number | string];

export type TBorderStyle =
  | 'none'
  | 'hidden'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'goove'
  | 'solid'
  | 'rideg'
  | 'inset'
  | 'outset';

export type TFontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | number;

export type TBoxStyle = {
  basic: {
    width: number;
    height: number;
    margin: number | [number, number?, number?, number?];
    padding: number | [number, number?, number?, number?];
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
    borderStyle: TBorderStyle | [TBorderStyle, TBorderStyle, TBorderStyle, TBorderStyle];
    borderColor: string | [string, string?, string?, string?];
    borderWidth: number | [number, number?, number?, number?];
    borderRadius: number | [number, number?, number?, number?];
  };
};

export type TTextStyle = {
  font: {
    color: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: TFontWeight;
  };
};

export type TButtonStyle = TBoxStyle & TTextStyle;

export type TAllStyle = TBoxStyle & TTextStyle;
