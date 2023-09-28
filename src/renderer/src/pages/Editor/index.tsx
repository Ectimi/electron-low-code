import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Box,styled } from '@mui/material';
import MaterialIndicatorBox from './MaterialIndicatorBox';
import PlotArea from './PlotArea';
import AttrPanel from './AttrPanel';

const ScBox = styled(Box)({
  display:'flex',
  width:'100%',
  height:'100%',
  overflow:'hidden'
})

const Editor: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ScBox>
        <MaterialIndicatorBox />
        <PlotArea />
        <AttrPanel />
      </ScBox>
    </DndProvider>
  );
};


export default Editor