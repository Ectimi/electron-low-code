import { FC } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Box, styled } from '@mui/material';
import PlotArea from './PlotArea';
import AttrPanel from './AttrPanel';
import { useSearchParams } from 'react-router-dom';
import { useMount } from 'ahooks';
import commonStore from '@/store/common';
import NavPanel from './NavPanel';

const ScBox = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
});

const Editor: FC = () => {
  const [searchParams] = useSearchParams();

  useMount(() => {
    const projectName = searchParams.get('projectName')!;
    const projectPath = searchParams.get('projectPath')!;
    commonStore.state.currentProjectName = projectName!;
    commonStore.state.currentProjectPath = projectPath!;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <ScBox>
        <NavPanel />
        <PlotArea />
        <AttrPanel />
      </ScBox>
    </DndProvider>
  );
};

export default Editor;
