import { Box, styled } from '@mui/material';
import { styleParser } from '../utils/styleParser';
import { TBoxProps, defaultProps } from './props';
import { cloneDeep } from 'lodash';
import { useDrop } from 'react-dnd';
import { IDropResult } from '@/pages/Editor/MaterialIndicatorBox';
import createMaterial from '../utils/createMaterial';
import editorStore from '@/store/editor';
import { PropsWithChildren } from 'react';

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
  const {
    id: materialId,
    children = [],
    style,
    attribute,
    ...restProps
  } = props;
  const sx = styleParser(style);
  const [, drop] = useDrop(() => ({
    accept: 'material',
    drop: (item: IDropResult, monitor) => {
      const didDrop = monitor.didDrop();
      
      if (!didDrop) {
        const materialItem = createMaterial(item.materialName, materialId);
        editorStore.addMaterial(materialItem);
      }
    },
  }));

  return (children as any).length === 0 ? (
    <EmptyBox
      ref={drop}
      id={attribute.id}
      className={attribute.className}
      {...restProps}
    >
      请将元素拖放到这里
    </EmptyBox>
  ) : (
    <Box
      ref={drop}
      id={attribute.id}
      className={attribute.className}
      sx={sx}
      {...restProps}
    >
      {children.map((material) => {
        const Component: any = material.component;

        return (
          <Component
            key={material.id}
            data-id={material.id}
            onClick={(e:MouseEvent) => {
              e.stopPropagation()
              editorStore.setCurrentMaterial(material.id)
            }}
            id={material.id}
            children={material.children}
            {...material.property}
          />
        );
      })}
    </Box>
  );
}

MBox.__default_property = cloneDeep(defaultProps);
