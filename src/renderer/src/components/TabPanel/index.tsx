import { Box, styled } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  [key:string]:any;
}

const PanelBox = styled(Box)({
  height: 'calc(100% - 48px)',
  overflowY: 'auto',
});

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <PanelBox role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </PanelBox>
  );
}
