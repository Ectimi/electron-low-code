import { Box } from '@mui/material';
import { styleParser } from '../utils/styleParser';
import { TButtonProps, defaultProps } from './props';
import { cloneDeep } from 'lodash';

export default function MButton(props: TButtonProps) {
  const { style, attribute, ...restProps } = props;
  const sx = styleParser(style);
 
  return (
    <Box
      id={attribute.id}
      className={attribute.className}
      sx={sx}
      {...restProps}
    >
      {attribute.text}
    </Box>
  );
}

MButton.__default_property = cloneDeep(defaultProps);
