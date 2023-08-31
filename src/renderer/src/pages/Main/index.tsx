import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Box } from '@mui/material';
import MaterialIndicatorBox from './MaterialIndicatorBox';
import Canvas from './Canvas';
import AttrPanel from './AttrPanel';

import './index.less';

export const Main: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box className="main">
        <MaterialIndicatorBox />
        <Canvas />
        <AttrPanel />
      </Box>
    </DndProvider>
  );
};
