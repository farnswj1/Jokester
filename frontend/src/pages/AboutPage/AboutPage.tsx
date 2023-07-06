import { FC } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { setTitle } from 'utils';

const AboutPage: FC = () => {
  setTitle('About');

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" sx={{ mb: 5 }}>About Us</Typography>
        <Typography sx={{ mb: 3 }}>
          This is an API that shares jokes that were posted on Reddit. If you have a
          sense of humor, proceed with caution. These jokes are not PG and are 100% NSFW.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Please refrain from reading these jokes at an inappropriate setting/environment.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Plase refrain from reading these jokes to your coworkers and especially your boss.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Please refrain from reading these jokes to the particularly sensitive.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          I am not the creator of the jokes whatsoever. I would not have had the time to
          create hundreds of thousands of jokes, some of which are repetitive and generic,
          and/or have poor grammar and incorrect spelling.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          In the end, I hope you enjoy using this API and I hope you use this responsibly.
        </Typography>
        <Typography>
          If you want to check out more of my projects,
          click <Link href="https://github.com/farnswj1">here</Link>.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
