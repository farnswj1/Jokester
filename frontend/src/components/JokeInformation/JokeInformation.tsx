import { FC } from 'react';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { RouterLink } from 'components';
import { Joke } from 'types';

interface JokeInformationProps {
  joke: Joke
}

const JokeInformation: FC<JokeInformationProps> = ({ joke }) => (
  <Paper component={Stack} spacing={3} padding={2}>
    <Typography variant="h5">
      {joke.title}
    </Typography>
    {
      joke.body.split(/\n+/g).map((text, index) => (
        <Typography key={index} paragraph>
          {text}
        </Typography>
      ))
    }
    <Divider />
    <Typography variant="subtitle1">
      {'This joke was created by '}
      {
        joke.author ? (
          <RouterLink color="secondary" to={`/users/${joke.author.id}`}>
            {joke.author.username}
          </RouterLink>
        ) : (
          '[DELETED]'
        )
      }
    </Typography>
  </Paper>
);

export default JokeInformation;
