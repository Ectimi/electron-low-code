export type TBackgroundPosition = number | string;

export type TCssValue = number | 'auto' | `${number}%`|`${number}px`

export type TDisplay =
  | 'block'
  | 'inline-block'
  | 'inline'
  | 'flex'
  | 'grid'
  | 'none';

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

export type TOutlineStyle =
  | 'none'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'inherit';

export type TFontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | number;

export type TCursor =
  | 'default'
  | 'auto'
  | 'crosshair'
  | 'pointer'
  | 'move'
  | 'e-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 'n-resize'
  | 'se-resize'
  | 'sw-resize'
  | 's-resize'
  | 'w-resize'
  | 'text'
  | 'wait'
  | 'help';

export type TGapValue = Array<number | string>;

export type TFlexContainer = {
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alinContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'psace-around'
    | 'stretch';
};

export type TFlexItem = {
  order: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: number | 'auto';
  alignSelf:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch';
};

export type TLayout = {
  display: TDisplay;
  flexLayout: {
    container: TFlexContainer;
    item: TFlexItem;
  };
};

export type TPosition = {
  position: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: TCssValue;
  bottom?: TCssValue;
  left?: TCssValue;
  right?: TCssValue;
  zIndex: number | 'auto';
};

export type TGap = {
  margin: TGapValue;
  padding: TGapValue;
};

export type TSize = {
  width: TCssValue;
  height: TCssValue;
  minWidth:
    TCssValue
    | 'min-content'
    | 'max-content'
    | 'fit-content'
    | 'fill-available';
  minHeight: TCssValue | 'min-content' | 'max-content' | 'fit-content';
  maxWidth:
    | number
    | 'none'
    | 'min-content'
    | 'max-content'
    | 'fit-content'
    | 'fill-available';
  maxHeight: number | 'none' | 'auto' | 'min-content' | 'max-content';
  overflow: 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit';
  objectFit: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
};

export type TText = {
  color: string;
  lineHeight:number;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  fontStyle: 'normal' | 'italic' | 'inherit';
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  textDecoration:
    | 'none'
    | 'underline'
    | 'overline'
    | 'line-through'
    | 'inherit';
};

export type TBackground = {
  backgroundColor: string;
  backgroundImage: string;
  backgroundSize: TBackgrounSize;
  backgroundRepeat: TBackgroundRepeat;
  backgroundPositionX: TBackgroundPosition;
  backgroundPositionY: TBackgroundPosition;
  backgroundClip: 'border-box' | 'padding-box' | 'content-box';
};

export type TOutline = {
  width: number;
  color: string;
  style: TOutlineStyle;
};

export type TBoxShadow = {
  boxShadowInset: boolean;
  boxShadowOffsetX: number;
  boxShadowOffsetY: number;
  boxShadowBlurRadius: number;
  boxShadowSpreadRadius: number;
  boxShadowColor: string;
};

export type TEffect = {
  outline: TOutline;
  opacity: number;
  cursor: TCursor;
  boxShadow: TBoxShadow;
};

export const enum EStyleType {
  layout = 'layout',
  position = 'position',
  gap = 'gap',
  size = 'size',
  text = 'text',
  background = 'background',
  effect = 'effect',
}

export type TStyle = {
  [EStyleType.layout]: TLayout;
  [EStyleType.position]: TPosition;
  [EStyleType.gap]: TGap;
  [EStyleType.size]: TSize;
  [EStyleType.text]: TText;
  [EStyleType.background]: TBackground;
  [EStyleType.effect]: TEffect;
};
