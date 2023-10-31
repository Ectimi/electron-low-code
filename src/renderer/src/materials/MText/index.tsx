import { cloneDeep } from 'lodash';
import { TTextProps, defaultProps } from './props';
import { styleParser } from '../utils/styleParser';
import { Box } from '@mui/material';

export default function MText(props: TTextProps) {
  const { style, attribute } = props;
  const sx = styleParser(style);

  return (
    <Box id={attribute.id} className={attribute.className} sx={sx}>
      {attribute.text}
    </Box>
  );
}

MText.__default_configuration = cloneDeep(defaultProps);
