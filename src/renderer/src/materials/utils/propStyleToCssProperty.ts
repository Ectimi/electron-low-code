import { CSSProperties } from 'react';
import { IMaterialProps, IStyle } from '../types';

function processStyle(obj: IStyle['basic']) {
  const style: any = {};
  let key: keyof IStyle['basic'];
  for (key in obj) {
    if (key === 'width' || key === 'height') {
      style[key] = obj[key] + 'px';
    } else if (key === 'margin' || key === 'padding') {
      style[key] = obj[key].map((value) => value + 'px').join(' ');
    } else {
      style[key] = obj[key];
    }
  }

  return style as CSSProperties;
}

function processBoxShadow(obj: IStyle['boxShadow']) {
  const {
    boxShadowInset,
    boxShadowOffsetX,
    boxShadowOffsetY,
    boxShadowBlurRadius,
    boxShadowSpreadRadius,
    boxShadowColor,
  } = obj;
  const inset = boxShadowInset ? 'inset' : '';
  const blurRadius = boxShadowBlurRadius < 0 ? 0 : boxShadowBlurRadius;

  return {
    boxShadow: `${inset} ${boxShadowOffsetX} ${boxShadowOffsetY} ${blurRadius} ${boxShadowSpreadRadius} ${boxShadowColor}`,
  };
}

export default function propStyleToCssProperty(
  propStyle: IMaterialProps['style']
) {
  const style: any = {};
  let key: keyof IStyle;
  for (key in propStyle) {
    if (Object.prototype.hasOwnProperty.call(propStyle, key)) {
      const obj = propStyle![key];
      if (
        key === 'basic' ||
        key === 'background' ||
        key === 'border' ||
        key === 'font'
      ) {
        Object.assign(style, processStyle(obj as any));
      } else if (key === 'boxShadow') {
        Object.assign(style, processBoxShadow(obj as IStyle['boxShadow']));
      }
    }
  }

  return style as CSSProperties;
}
