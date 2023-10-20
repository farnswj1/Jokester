import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

const ButtonLink: FC<ButtonProps & LinkProps> = ({ children, ...rest }) => (
  <Button component={Link} {...rest}>
    {children}
  </Button>
);

export default ButtonLink;
