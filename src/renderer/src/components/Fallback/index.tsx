import { Box } from '@mui/material';

export default function Fallback({ error, resetErrorBoundary }: any) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Box sx={{ padding: '10px' }}>
      <p>Something went wrong:</p>
      <div style={{ color: 'red' }}>{error.message}</div>
    </Box>
  );
}
