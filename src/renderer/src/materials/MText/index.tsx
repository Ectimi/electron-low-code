import { cloneDeep } from 'lodash';
import { TTextProps, defaultProps } from './props';
import { styleParser } from '../utils/styleParser';
import { Box } from '@mui/material';

export default function MText(props: TTextProps) {
  const { style, attribute, ...restProps } = props;
  const sx = styleParser(style);

  return (
    <Box
      component="span"
      id={attribute.id}
      className={attribute.className}
      sx={sx}
      {...restProps}
    >
      {attribute.text}
    </Box>
  );
}

MText.__default_property = cloneDeep(defaultProps);
