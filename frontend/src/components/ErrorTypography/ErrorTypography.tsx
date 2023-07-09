import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { errorStyle } from 'utils';

const ErrorTypography: FC<TypographyProps> = (props) => (
  <Typography variant="h5" sx={errorStyle} {...props}>
    {props.children}
  </Typography>
);

export default ErrorTypography;
