import { FC } from 'react';
import { Typography, Link } from '@mui/material';
import { HeaderTypography, PageContainer } from 'components';
import { setTitle, paddingStyle } from 'utils';

const AboutPage: FC = () => {
  setTitle('About');

  return (
    <PageContainer>
      <HeaderTypography>
        About Us
      </HeaderTypography>
      <Typography sx={paddingStyle}>
        This is an API that shares jokes that were posted on Reddit. If you have a
        sense of humor, proceed with caution. These jokes are not PG and are 100% NSFW.
      </Typography>
      <Typography sx={paddingStyle}>
        Please refrain from reading these jokes at an inappropriate setting/environment.
      </Typography>
      <Typography sx={paddingStyle}>
        Plase refrain from reading these jokes to your coworkers and especially your boss.
      </Typography>
      <Typography sx={paddingStyle}>
        Please refrain from reading these jokes to the particularly sensitive.
      </Typography>
      <Typography sx={paddingStyle}>
        I am not the creator of the jokes whatsoever. I would not have had the time to
        create hundreds of thousands of jokes, some of which are repetitive and generic,
        and/or have poor grammar and incorrect spelling.
      </Typography>
      <Typography sx={paddingStyle}>
        In the end, I hope you enjoy using this API and I hope you use this responsibly.
      </Typography>
      <Typography>
        If you want to check out more of my projects,
        click <Link href="https://github.com/farnswj1">here</Link>.
      </Typography>
    </PageContainer>
  );
};

export default AboutPage;
