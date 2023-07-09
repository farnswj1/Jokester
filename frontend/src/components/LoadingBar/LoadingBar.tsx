import { FC } from 'react';
import { LinearProgress } from '@mui/material';
import { paddingStyle } from 'utils';

const LoadingBar: FC = () => (
  <LinearProgress color="inherit" sx={paddingStyle} />
);

export default LoadingBar;
