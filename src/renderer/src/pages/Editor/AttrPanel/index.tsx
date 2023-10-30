import { useState, SyntheticEvent } from 'react';
import { Box, Paper as MPaper, Tabs, Tab, styled } from '@mui/material';
import StylePanelRenderer from '@/core/StylePanelRenderer';
import AniPanelRenderer from '@/core/AniPanelRenderer';
import AttributePanelRenderer from 'root/renderer/src/core/AttributePanelRenderer';

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

export default function AttrPanel() {
  const [index, setIndex] = useState(1);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  return (
    <AttrPanelBox id="attrPanelBox" elevation={5}>
      <Tabs value={index} onChange={handleChange}>
        <Tab label="属性" />
        <Tab label="样式" />
        <Tab label="动画" />
      </Tabs>
      <TabPanel value={index} index={0}>
        <AttributePanelRenderer />
      </TabPanel>
      <TabPanel value={index} index={1}>
        <StylePanelRenderer />
      </TabPanel>
      <TabPanel value={index} index={2}>
        <AniPanelRenderer />
      </TabPanel>
    </AttrPanelBox>
  );
}
