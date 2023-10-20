import { FC } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { HeaderTypography } from 'components';
import { setTitle } from 'utils';

const PageNotFoundPage: FC = () => {
  setTitle('Page Not Found');

  return (
    <Container>
      <Stack spacing={3} justifyContent="center" alignItems="center">
        <HeaderTypography>
          Page Not Found
        </HeaderTypography>
        <Typography variant="h5">
          Hey there! You might be lost. Who knows.
          But this page doesn't exist. Sorry!
        </Typography>
      </Stack>
    </Container>
  );
};

export default PageNotFoundPage;
