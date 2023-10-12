import { Box } from '@mui/material';
import { styleParser } from '../utils/styleParser';
import { defaultProps } from './props';
import { TMaterialProps } from '../types/material';
import { cloneDeep } from 'lodash';

export default function MButton(props: TMaterialProps) {
  const sx = styleParser(props.style);

  return <Box sx={sx}>按钮</Box>;
}

MButton.__default_configuration = cloneDeep(defaultProps);
