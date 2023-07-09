import { Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import { headerStyle, paddingStyle } from 'utils';
import { Joke } from 'types';

interface JokeInformationProps {
  joke: Joke
}

const JokeInformation: FC<JokeInformationProps> = ({ joke }) => (
  <Fragment>
    <Typography variant="h4" sx={headerStyle}>
      {joke?.title}
    </Typography>
    {
      joke?.body.split(/\n+/g).map((text, index) => (
        <Typography key={index} sx={paddingStyle}>
          {text}
        </Typography>
      ))
    }
  </Fragment>
);

export default JokeInformation;
