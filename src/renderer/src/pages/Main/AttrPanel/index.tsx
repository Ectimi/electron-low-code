import { useState, SyntheticEvent } from 'react';
import { Paper, Tabs, Tab,styled } from '@mui/material';
import StylePanelRenderer from '@/core/StylePanelRenderer';
import AniPanelRenderer from '@/core/AniPanelRenderer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

const ScAttrPanel = styled(Paper)({
  width:'var(--right-panel-width)',
  padding:'var(--common-gap)'
})

export default function AttrPanel() {
  const [index, setIndex] = useState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };
  return (
    <ScAttrPanel elevation={5}>
      <Tabs value={index} onChange={handleChange}>
        <Tab label="样式" />
        <Tab label="动画" />
      </Tabs>
      <TabPanel value={index} index={0}>
        <StylePanelRenderer />
      </TabPanel>
      <TabPanel value={index} index={1}>
        <AniPanelRenderer />
      </TabPanel>
    </ScAttrPanel>
  );
}
