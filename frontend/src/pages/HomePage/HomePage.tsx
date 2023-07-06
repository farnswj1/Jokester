import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, LinearProgress } from '@mui/material';
import { APIService } from 'services';
import { useAuth } from 'hooks'; 
import SearchJokeForm from './SearchJokeForm';
import JokeList from './JokeList';
import { setTitle } from 'utils';
import { BaseJoke } from 'types';

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

    APIService.get(url)
      .then(({ data, status }) => {
        setStatus(status);
        return data;
      })
      .then(({ results, previousPage, nextPage }) => {
        setJokes(results);
        setPreviousPage(previousPage);
        setNextPage(nextPage);
      })
      .catch(({ response }) => {
        setJokes(null);
        setPreviousPage(null);
        setNextPage(null);
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => getJokesList('/api/jokes/all/'), []);

  const handleSearchSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const query = new URLSearchParams(data as any).toString();
    getJokesList(`/api/jokes/all/?${query}`);
  }

  const isStaff = user?.hasGroup('Administrators');

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h2" align="center" sx={{ mb: 3 }}>
          Jokes API
        </Typography>
        <Box sx={{ mb: 3 }}>
          <SearchJokeForm handleSubmit={handleSearchSubmit} />
        </Box>
        {
          isStaff && (
            <Link to="/jokes/new">
              <Button variant="contained" sx={{ mb: 3 }}>
                Add New Joke
              </Button>
            </Link>
          )
        }
        {
          isLoading ? (
            <LinearProgress color="inherit" />
          ) : status && status >= 500 ? (
            <Typography variant="h5">
              There was an error with the server.
            </Typography>
          ) : jokes?.length === 0 ? (
            <Typography variant="h5">
              No joke met the search criteria.
            </Typography>
          ) : (
            <JokeList
              jokes={jokes || []}
              previousPage={previousPage}
              nextPage={nextPage}
              changePage={getJokesList}
            />
          )
        }
      </Grid>
    </Grid>
  );
};

export default HomePage;
