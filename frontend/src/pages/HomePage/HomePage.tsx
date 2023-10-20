import { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import {
  ButtonLink,
  HeaderTypography,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';
import { BaseJoke } from 'types';
import SearchJokeForm from './SearchJokeForm';
import JokeList from './JokeList';

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [jokes, setJokes] = useState<BaseJoke[] | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const { user } = useAuth();
  setTitle('Home');

  const getJokesList = (url: string) => {
    setIsLoading(true);
    setStatus(null);
    setJokes(null);
    setPreviousPage(null);
    setNextPage(null);

    APIService.get(url)
      .then(({ data, status }) => {
        setStatus(status);
        return data;
      })
      .then(({ results, previous, next }) => {
        setJokes(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => getJokesList('/api/jokes/all/'), []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams(data as any).toString();
    getJokesList(`/api/jokes/all/?${query}`);
  };

  return (
    <Container>
      <Stack spacing={3}>
        <HeaderTypography>
          Jokes API
        </HeaderTypography>
        <SearchJokeForm onSubmit={handleSearchSubmit} />
        {
          isLoading && (
            <LoadingBar />
          )
        }
        {
          user && (
            <Box>
              <ButtonLink
                variant="contained"
                color="primary"
                to="/jokes/new"
              >
                Add New Joke
              </ButtonLink>
            </Box>
          )
        }
        {
          (status && status >= 500) && (
            <ServerErrorMessage />
          )
        }
        {
          jokes && (
            <JokeList
              jokes={jokes}
              previousPage={previousPage}
              nextPage={nextPage}
              changePage={getJokesList}
            />
          )
        }
      </Stack>
    </Container>
  );
};

export default HomePage;
