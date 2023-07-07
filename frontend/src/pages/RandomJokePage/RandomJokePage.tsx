import { FC, Fragment, useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { APIService } from 'services';
import { setTitle } from 'utils';
import { Joke } from 'types';

const RandomJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  setTitle('Random Joke');

  const getRandomJoke = () => {
    setIsLoading(true);
    setStatus(null);

    APIService.get('/api/jokes/random/')
      .then(({ data, status }) => {
        setJoke(data);
        setStatus(status);
      })
      .catch(({ response }) => {
        setJoke(null);
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getRandomJoke, []);

  return (
    <Box>
      {
        isLoading ? (
          <LinearProgress color="inherit" />
        ) : status && status >= 500 ? (
          <Typography variant="h5" sx={{ color: 'red' }}>
            There was an error with the server.
          </Typography>
        ) : (
          <Fragment>
            <Button
              variant="contained"
              sx={{ mb: 5 }}
              size="large"
              onClick={getRandomJoke}
            >
              Get another joke!
            </Button>
            <Typography variant="h4" sx={{ mb: 5 }}>
              {joke?.title}
            </Typography>
            {
              joke?.body.split(/\n+/g).map((text, index) => (
                <Typography key={index} sx={{ mb: 3 }}>
                  {text}
                </Typography>
              ))
            }
          </Fragment>
        )
      }
    </Box>
  );
};

export default RandomJokePage;
