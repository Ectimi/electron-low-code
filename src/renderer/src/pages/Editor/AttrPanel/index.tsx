import { useState, SyntheticEvent } from 'react';
import { Box, Paper as MPaper, Tabs, Tab, styled, Stack } from '@mui/material';
import StylePanelRenderer from '@/core/StylePanelRenderer';
import AniPanelRenderer from '@/core/AniPanelRenderer';
import AttributePanelRenderer from 'root/renderer/src/core/AttributePanelRenderer';
import { useSnapshot } from 'valtio';
import editorStore from 'root/renderer/src/store/editor';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      sx={{ height: 'calc(100% - 48px)', overflowY: 'auto' }}
    >
      {value === index && children}
    </Box>
  );
}

const AttrPanelBox = styled(MPaper)({
  position: 'relative',
  width: 'var(--right-panel-width)',
  // padding:'var(--common-gap)',
  userSelect: 'none',
});

const TabTypes = ['属性', '样式', '动画'];

export default function AttrPanel() {
  const editorSnap = useSnapshot(editorStore.state);
  const [tabIndex, setTabIndex] = useState(1);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <AttrPanelBox id="attrPanelBox" elevation={5}>
      <Tabs value={tabIndex} onChange={handleChange}>
        {TabTypes.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      {TabTypes.map((label, index) =>
        editorSnap.currentMaterial ? (
          <TabPanel key={label} value={tabIndex} index={index}>
            {index === 0 && <AttributePanelRenderer />}
            {index === 1 && <StylePanelRenderer />}
            {index === 2 && <AniPanelRenderer />}
          </TabPanel>
        ) : (
          <Stack
            key={label}
            sx={{ height: '100%' }}
            direction={'row'}
            alignItems="center"
            justifyContent="center"
          >
            请在画布中选择组件
          </Stack>
        )
      )}
    </AttrPanelBox>
  );
}
