import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { setTitle } from 'utils';

const PageNotFoundPage: FC = () => {
  setTitle('Page Not Found');

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h5">
          Hey there! You might be lost. Who knows.
          But this page doesn't exist. Sorry!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageNotFoundPage;
