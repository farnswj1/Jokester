import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const HeaderTypography: FC<TypographyProps> = ({ children, ...rest }) => (
  <Typography variant="h3" {...rest}>
    {children}
  </Typography>
);

export default HeaderTypography;
