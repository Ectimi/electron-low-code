import { Box } from '@mui/material';
import { styleParser } from '../utils/styleParser';
import { TBoxProps, defaultProps } from './props';
import { cloneDeep } from 'lodash';
import { useDrop } from 'react-dnd';
import { IDropResult } from '@/pages/Editor/MaterialIndicatorBox';
import createMaterial from '../utils/createMaterial';

export default function MButton(props: TBoxProps) {
  const { style, attribute } = props;
  const sx = styleParser(style);
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult,monitor) => {
        const didDrop = monitor.didDrop()
        console.log('didDrop',monitor);
        
      //   const materialItem = createMaterial(item.materialName);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box ref={drop} id={attribute.id} className={attribute.className} sx={sx}>
      请将元素播放到这里
    </Box>
  );
}

MButton.__default_property = cloneDeep(defaultProps);
