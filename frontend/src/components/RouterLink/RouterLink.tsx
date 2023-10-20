import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';

const RouterLink: FC<MUILinkProps & LinkProps> = ({ children, ...rest }) => (
  <MUILink component={Link} {...rest}>
    {children}
  </MUILink>
);

export default RouterLink;
