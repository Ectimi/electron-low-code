import { CSSProperties, useMemo } from 'react';
import { Button } from '@mui/material';
import { IMaterialProps } from '../types';
import propStyleToCssProperty from '../utils/propStyleToCssProperty';
import defaultProps from './defaultProps';

export default function MButton(p: IMaterialProps) {
  const style = useMemo(() => ({ ...defaultProps.style, ...p.style }), [p.style]);
  const fashion = useMemo(() => {
    return propStyleToCssProperty(style);
  }, [style]) as CSSProperties;

  return <Button sx={fashion}>按钮</Button>;
}
