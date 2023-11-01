import Image from '@/components/Image';
import { TImageProps, defaultProps } from './props';
import { cloneDeep } from 'lodash';
import { styleParser } from '../utils/styleParser';
import ImagePng from '@/assets/image.png';
import { CSSProperties } from '@mui/material/styles/createMixins';

export default function MImage(props: TImageProps) {
  const { style, attribute,...restProps } = props;
  const sx: CSSProperties = {
    ...styleParser(style),
    objectFit: attribute.objectFix,
  };
  const url = attribute.url || ImagePng;

  return (
    <Image
      id={attribute.id}
      className={attribute.className}
      sx={sx}
      src={url}
      {...restProps}
    />
  );
}

MImage.__default_property = cloneDeep(defaultProps);
