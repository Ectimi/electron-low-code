import { CSSProperties } from 'react';
import { TAllStyle, TBoxStyle, TTextStyle } from '../types/style';
import { DeepPartial } from '../types/utils';

function processBoxStyle(
  boxStyle:
    | TBoxStyle['basic']
    | TBoxStyle['boxShadow']
    | TBoxStyle['background']
    | TBoxStyle['border']
) {
  const style: any = {};

  if ('width' in boxStyle) {
    let key: keyof TBoxStyle['basic'];
    for (key in boxStyle) {
      const value = boxStyle[key];
      if (key === 'width' || key === 'height') {
        style[key] = value + 'px';
      } else if (key === 'margin' || key === 'padding') {
        style[key] = Array.isArray(value)
          ? value.map((n) => n + 'px').join(' ')
          : value + 'px';
      } else if (key === 'opacity') {
        style[key] = value;
      }
    }
  } else if ('backgroundColor' in boxStyle) {
    let key: keyof TBoxStyle['background'];
    for (key in boxStyle) {
      const value = boxStyle[key];
      if (key === 'backgroundColor' || key === 'backgroundRepeat') {
        style[key] = value;
      } else if (key === 'backgroundImage') {
        style[key] = value === 'none' ? value : `url(${value})`;
      } else if (
        key === 'backgroundPositionX' ||
        key === 'backgroundPositionY'
      ) {
        if (typeof value === 'number') {
          style[key] = value + 'px';
        } else {
          style[key] = value;
        }
      }
    }
  } else if ('borderStyle' in boxStyle) {
    let key: keyof TBoxStyle['border'];
    for (key in boxStyle) {
      const value = boxStyle[key];
      if (key === 'borderStyle' || key === 'borderColor') {
        style[key] = Array.isArray(value) ? value.join(' ') : value;
      } else if (key === 'borderWidth' || key === 'borderRadius') {
        style[key] = Array.isArray(value)
          ? value.map((n) => n + 'px').join(' ')
          : value + 'px';
      }
    }
  } else if ('boxShadow' in boxStyle) {
    const {
      boxShadowInset,
      boxShadowOffsetX,
      boxShadowOffsetY,
      boxShadowBlurRadius,
      boxShadowSpreadRadius,
      boxShadowColor,
    } = boxStyle;
    const inset = boxShadowInset ? 'inset' : '';
    const blurRadius = boxShadowBlurRadius < 0 ? 0 : boxShadowBlurRadius;
    style[
      'boxShadow'
    ] = `${inset} ${boxShadowOffsetX} ${boxShadowOffsetY} ${blurRadius} ${boxShadowSpreadRadius} ${boxShadowColor}`;
  }

  return style as CSSProperties;
}

function processFontStyle(fontStyle: TTextStyle['font']) {
  const style: any = {};
  let key: keyof TTextStyle['font'];
  for (key in fontStyle) {
    const value = fontStyle[key];
    if (key === 'color' || key === 'fontFamily' || key === 'fontWeight') {
      style[key] = value;
    } else if (key === 'fontSize') {
      style[key] = value + 'px';
    }
  }
  return style as CSSProperties;
}

export default function propStyleToCssProperty(
  propStyle: DeepPartial<TAllStyle>
) {
  const style: any = {};
  let key: keyof TAllStyle;
  for (key in propStyle) {
    if (Object.prototype.hasOwnProperty.call(propStyle, key)) {
      const obj = propStyle![key];
      if (
        key === 'basic' ||
        key === 'background' ||
        key === 'border' ||
        key === 'boxShadow'
      ) {
        Object.assign(style, processBoxStyle(obj as any));
      } else if (key === 'font') {
        Object.assign(style, processFontStyle(obj as TTextStyle['font']));
      }
    }
  }

  return style as CSSProperties;
}
