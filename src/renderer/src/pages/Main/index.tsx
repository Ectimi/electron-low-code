import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Stack from '@mui/material/Stack';
import MaterialBox from './MaterialBox';
import Canvas from './Canvas';

import './index.less';

export const Main: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Stack className="main" direction="row" spacing={2}>
        <MaterialBox />
        <Canvas />
        <div className="panel">panel</div>
      </Stack>
    </DndProvider>
  );
};
