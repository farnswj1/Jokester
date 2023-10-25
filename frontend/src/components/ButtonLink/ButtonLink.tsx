import { FC, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

const ButtonLink: FC<ButtonProps & LinkProps> = forwardRef(({ children, ...rest }, ref) => (
  <Button component={Link} ref={ref} {...rest}>
    {children}
  </Button>
));

export default ButtonLink;
