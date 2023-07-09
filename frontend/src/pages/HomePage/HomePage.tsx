import { FC, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import {
  HeaderTypography,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle, paddingStyle } from 'utils';
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
  const isStaff = user?.hasGroup('Administrators');
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
    <PageContainer>
      <HeaderTypography>
        Jokes API
      </HeaderTypography>
      <Box sx={paddingStyle}>
        <SearchJokeForm onSubmit={handleSearchSubmit} />
      </Box>
      {
        isLoading && (
          <LoadingBar />
        )
      }
      {
        isStaff && (
          <Link to="/jokes/new">
            <Button variant="contained" sx={paddingStyle}>
              Add New Joke
            </Button>
          </Link>
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
    </PageContainer>
  );
};

export default HomePage;
