import { FC, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';

const RouterLink: FC<MUILinkProps & LinkProps> = forwardRef(({ children, ...rest }, ref) => (
  <MUILink component={Link} ref={ref} {...rest}>
    {children}
  </MUILink>
));

export default RouterLink;
