import { FC } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { HeaderTypography, RouterLink } from 'components';
import { setTitle } from 'utils';

const AboutPage: FC = () => {
  setTitle('About');

  return (
    <Container>
      <Stack spacing={3}>
        <HeaderTypography>
          About Us
        </HeaderTypography>
        <Typography paragraph>
          This is an API that shares jokes that were posted on Reddit. If you have a
          sense of humor, proceed with caution. These jokes are not PG and are 100% NSFW.
        </Typography>
        <Typography paragraph>
          Please refrain from reading these jokes at an inappropriate setting/environment.
        </Typography>
        <Typography paragraph>
          Plase refrain from reading these jokes to your coworkers and especially your boss.
        </Typography>
        <Typography paragraph>
          Please refrain from reading these jokes to the particularly sensitive.
        </Typography>
        <Typography paragraph>
          I am not the creator of the jokes whatsoever. I would not have had the time to
          create hundreds of thousands of jokes, some of which are repetitive and generic,
          and/or have poor grammar and incorrect spelling.
        </Typography>
        <Typography paragraph>
          In the end, I hope you enjoy using this API and I hope you use this responsibly.
        </Typography>
        <Typography>
          If you want to check out more of my projects,
          click <RouterLink color="secondary" to="https://github.com/farnswj1">here</RouterLink>.
        </Typography>
      </Stack>
    </Container>
  );
};

export default AboutPage;
