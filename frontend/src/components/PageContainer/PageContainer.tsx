import { FC } from 'react';
import { Container, ContainerProps } from '@mui/material';

const PageContainer: FC<ContainerProps> = (props) => (
  <Container sx={{ my: 5 }} {...props}>
    {props.children}
  </Container>
);

export default PageContainer;
