import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const ErrorTypography: FC<TypographyProps> = ({ children, ...rest }) => (
  <Typography variant="h5" color="error" {...rest}>
    {children}
  </Typography>
);

export default ErrorTypography;
