import { FC } from 'react';
import { Typography } from '@mui/material';
import { HeaderTypography, PageContainer } from 'components';
import { setTitle } from 'utils';

const PageNotFoundPage: FC = () => {
  setTitle('Page Not Found');

  return (
    <PageContainer>
      <HeaderTypography>
        Page Not Found
      </HeaderTypography>
      <Typography variant="h5" align="center">
        Hey there! You might be lost. Who knows.
        But this page doesn't exist. Sorry!
      </Typography>
    </PageContainer>
  );
};

export default PageNotFoundPage;
