import {useMemo} from 'react';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useCols() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  return useMemo(() => {
    if (isXl) return 5;
    if (isLg) return 4;
    if (isMd) return 3;
    if (isSm) return 2;
    if (isXs) return 1;
  }, [isXs, isSm, isMd, isLg, isXl]);
}
