import { FC } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const HeaderTypography: FC<TypographyProps> = (props) => (
  <Typography variant="h3" {...props} />
);

export default HeaderTypography;
