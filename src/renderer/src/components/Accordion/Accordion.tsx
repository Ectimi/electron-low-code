import { styled, Accordion as MuiAccordion } from '@mui/material';

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  '.MuiButtonBase-root': {
    minHeight: '30px',
  },
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export default Accordion;
