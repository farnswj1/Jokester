import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { headerStyle } from 'utils';

const HeaderTypography: FC<TypographyProps> = (props) => (
  <Typography variant="h2" align="center" sx={headerStyle} {...props}>
    {props.children}
  </Typography>
);

export default HeaderTypography;
