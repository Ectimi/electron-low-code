import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Box,styled } from '@mui/material';
import MaterialIndicatorBox from './MaterialIndicatorBox';
import PlottingArea from './PlottingArea';
import AttrPanel from './AttrPanel';

const ScBox = styled(Box)({
  display:'flex',
  width:'100%',
  height:'100%',
  overflow:'hidden'
})

export const Main: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ScBox>
        <MaterialIndicatorBox />
        <PlottingArea />
        <AttrPanel />
      </ScBox>
    </DndProvider>
  );
};
