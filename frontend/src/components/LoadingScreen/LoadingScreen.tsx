import { FC } from 'react';
import { Container } from '@mui/material';
import { LoadingBar } from 'components';

const LoadingScreen: FC = () => (
  <Container>
    <LoadingBar />
  </Container>
);

export default LoadingScreen;
