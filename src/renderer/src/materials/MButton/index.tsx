import { CSSProperties, useMemo } from 'react';
import { Box } from '@mui/material';
import propStyleToCssProperty from '../utils/propStyleToCssProperty';
import { TButtonProps, defaultProps } from './props';

export default function MButton(props: TButtonProps) {
  const { property, custom } = props;
  const sx = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: custom.textPosition,
      cursor:'pointer',
      ...propStyleToCssProperty(property.style),
    }),
    [property, custom]
  ) as CSSProperties;

  return <Box sx={sx}>按钮</Box>;
}

MButton.__default_configuration = defaultProps;
