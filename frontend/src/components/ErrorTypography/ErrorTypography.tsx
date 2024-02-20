import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const ErrorTypography: FC<TypographyProps> = (props) => (
  <Typography variant="h5" color="error" {...props} />
);

export default ErrorTypography;
