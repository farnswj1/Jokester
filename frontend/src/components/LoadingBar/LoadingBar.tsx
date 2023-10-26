import { FC } from 'react';
import { LinearProgress, LinearProgressProps } from '@mui/material';

const LoadingBar: FC<LinearProgressProps> = (props) => (
  <LinearProgress color="secondary" {...props} />
);

export default LoadingBar;
