import { FC, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';

const RouterLink: FC<MUILinkProps & LinkProps> = forwardRef((props, ref) => (
  <MUILink component={Link} ref={ref} {...props} />
));

export default RouterLink;
