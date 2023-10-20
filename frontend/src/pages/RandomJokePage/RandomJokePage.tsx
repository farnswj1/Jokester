import { FC, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container, Stack } from '@mui/material';
import {
  ButtonLink,
  HeaderTypography,
  JokeInformation,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { setTitle } from 'utils';
import { Joke } from 'types';

const RandomJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  setTitle('Random Joke');

  const getRandomJoke = () => {
    setIsLoading(true);
    setStatus(null);
    setJoke(null);

    APIService.get('/api/jokes/random/')
      .then(({ data, status }) => {
        setJoke(data);
        setStatus(status);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getRandomJoke, []);

  return (
    <Container>
      <Stack spacing={3}>
        <HeaderTypography>
          Random Joke
        </HeaderTypography>
        {
          isLoading && (
            <LoadingBar />
          )
        }
        {
          (status && status >= 500) && (
            <ServerErrorMessage />
          )
        }
        {
          joke && (
            <JokeInformation joke={joke} />
          )
        }
        <Box>
          <ButtonGroup variant="contained">
            <ButtonLink to="/">
              Back
            </ButtonLink>
            <Button onClick={getRandomJoke}>
              Get another joke!
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </Container>
  );
};

export default RandomJokePage;
