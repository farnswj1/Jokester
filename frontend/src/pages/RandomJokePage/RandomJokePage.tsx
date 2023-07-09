import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import {
  HeaderTypography,
  JokeInformation,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { footerStyle, setTitle } from 'utils';
import { Joke } from 'types';

const RandomJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    <PageContainer>
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
      <ButtonGroup variant="contained" sx={footerStyle}>
        <Button size="large">
          <Link to="/">
            Back
          </Link>
        </Button>
        <Button size="large" onClick={getRandomJoke}>
          Get another joke!
        </Button>
      </ButtonGroup>
    </PageContainer>
  );
};

export default RandomJokePage;
