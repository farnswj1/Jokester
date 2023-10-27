import { FC } from 'react';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import { LikeButton, RouterLink } from 'components';
import { useAuth } from 'hooks';
import { Joke } from 'types';

interface JokeInformationProps {
  joke: Joke
}

const JokeInformation: FC<JokeInformationProps> = ({ joke }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <Paper component={Stack} spacing={3} padding={2}>
      <Stack spacing={1} alignItems="start">
        <Typography variant="h5">
          {joke.title}
        </Typography>
        <LikeButton
          joke={joke}
          defaultChecked={joke.liked_by}
          disabled={!isAuthenticated}
        />
      </Stack>
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
};

export default JokeInformation;
