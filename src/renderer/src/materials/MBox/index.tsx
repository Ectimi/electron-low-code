import { Box, styled } from '@mui/material';
import { styleParser } from '../utils/styleParser';
import { TBoxProps, defaultProps } from './props';
import { cloneDeep } from 'lodash';
import { useDrop } from 'react-dnd';
import { IDropResult } from '@/pages/Editor/MaterialIndicatorBox';
import createMaterial from '../utils/createMaterial';

const EmptyBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto',
  height: 50,
  backgroundColor: '#f1f1f1',
  color: '#a7b1bd',
});

export default function MBox(props: TBoxProps) {
  const { style, attribute, ...restProps } = props;
  const sx = styleParser(style);
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        console.log('drop');
      }
    },
  }));

  return (
    <EmptyBox
      ref={drop}
      id={attribute.id}
      className={attribute.className}
      {...restProps}
    >
      请将元素拖放到这里
    </EmptyBox>
  );
}

MBox.__default_property = cloneDeep(defaultProps);
