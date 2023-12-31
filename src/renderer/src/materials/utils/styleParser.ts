import { CSSProperties } from 'react';
import {
  TBackground,
  TFlexContainer,
  TFlexItem,
  TText,
  TSize,
  TStyle,
} from '../types/style';

const styleValueParser = (
  val: number | string | Array<number | string>
): string => {
  if (typeof val === 'string') {
    if (val.endsWith('px') || val.endsWith('%')) return val;
    else if (typeof parseFloat(val) === 'number' && !isNaN(parseFloat(val))) {
      return parseFloat(val) + 'px';
    }
    return val;
  }
  if (Array.isArray(val)) return val.map((n) => styleValueParser(n)).join(' ');
  return val + 'px';
};

const styleParser = (styleProps: TStyle) => {
  const { layout, position, gap, size, text, background, effect } = styleProps;
  const targetStyle: CSSProperties = {};

  // 处理 layout 样式
  targetStyle.display = layout.display;
  if (layout.display.includes('flex') && layout.flexLayout) {
    const { container, item } = layout.flexLayout;

    Object.keys(container).map((key) => {
      (targetStyle as any)[key] = container[key as keyof TFlexContainer];
    });
    Object.keys(item).map((key) => {
      (targetStyle as any)[key] = item[key as keyof TFlexItem];
    });
  }

  // 处理 positio 样式
  targetStyle.position = position.position;
  if (position.zIndex) targetStyle.zIndex = position.zIndex;
  if (position.top) targetStyle.top = styleValueParser(position.top);
  if (position.bottom) targetStyle.bottom = styleValueParser(position.bottom);
  if (position.left) targetStyle.left = styleValueParser(position.left);
  if (position.right) targetStyle.right = styleValueParser(position.right);

  // 处理 gap 样式
  targetStyle.margin = styleValueParser(gap.margin);
  targetStyle.padding = styleValueParser(gap.padding);

  // 处理 size 样式
  Object.keys(size).map((key) => {
    (targetStyle as any)[key] = styleValueParser(size[key as keyof TSize]!);
  });

  // 处理 text 样式
  Object.keys(text).map((key) => {
    const value: any =
      key === 'fontWeight'
        ? (targetStyle as any)[key]
        : styleValueParser(text[key as keyof TText]!);
    (targetStyle as any)[key] = value;
  });

  // 处理 background 样式
  Object.keys(background).map((key) => {
    let value: any = background[key as keyof TBackground];
    if (Array.isArray(value)) {
      (targetStyle as any)[key] = value
        .map((v) => styleValueParser(v))
        .join(' ');
    } else {
      if (key === 'backgroundImage') {
        value = 'url(' + value + ')';
      }
      (targetStyle as any)[key] = value;
    }
  });

  // 处理 effect 样式
  const { outline, opacity, cursor, boxShadow } = effect;
  targetStyle.outline = `${styleValueParser(outline.width)} ${outline.style} ${
    outline.color
  }`;
  targetStyle.opacity = opacity;
  targetStyle.cursor = cursor;

  const {
    boxShadowInset,
    boxShadowOffsetX,
    boxShadowOffsetY,
    boxShadowBlurRadius,
    boxShadowSpreadRadius,
    boxShadowColor,
  } = boxShadow;
  const inset = boxShadowInset ? 'inset' : '';
  const blurRadius = boxShadowBlurRadius < 0 ? 0 : boxShadowBlurRadius;
  targetStyle.boxShadow = `${inset} ${boxShadowOffsetX}px ${boxShadowOffsetY}px ${blurRadius}px ${boxShadowSpreadRadius}px ${boxShadowColor}`;

  return targetStyle;
};

export { styleParser };
