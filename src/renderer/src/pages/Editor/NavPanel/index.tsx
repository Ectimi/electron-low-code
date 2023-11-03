import { SyntheticEvent } from 'react';
import { Box, Tab, Tabs, styled } from '@mui/material';
import { useSafeState } from 'ahooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import _TabPanel from 'root/renderer/src/components/TabPanel';
import MaterialIndicatorBox from './MaterialIndicatorBox';
import NodeTree from './NodeTree';

const TabBox = styled(Box)({
  display: 'flex',
});

const TabPanel = styled(_TabPanel)({
  width: ' var(--left-panel-width)',
});

export default function NavPanel() {
  const [tabIndex, setTabIndex] = useSafeState(0);
  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <TabBox>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleChange}
      >
        <Tab icon={<AddBoxIcon />} label="物料库" />
        <Tab icon={<AccountTreeIcon />} label="页面大纲" />
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <MaterialIndicatorBox />
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <NodeTree />
      </TabPanel>
    </TabBox>
  );
}
