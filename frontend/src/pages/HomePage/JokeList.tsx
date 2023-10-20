import { FC } from 'react';
import { ButtonGroup, Button, Grid, Typography, Box } from '@mui/material';
import { ButtonLink } from 'components';
import { BaseJoke } from 'types';

interface JokeListProps {
  jokes: BaseJoke[]
  previousPage: string | null
  nextPage: string | null
  changePage: CallableFunction
}

const JokeList: FC<JokeListProps> = ({
  jokes,
  previousPage,
  nextPage,
  changePage
}) => {
  const getPreviousPage = () => changePage(previousPage);
  const getNextPage = () => changePage(nextPage);

  return (
    <Box>
      {
        jokes.length === 0 ? (
          <Typography variant="h5">
            No joke met the search criteria.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {
              jokes.map(joke => (
                <Grid item xs={12} md={6} key={joke.id}>
                  <ButtonLink
                    variant="text"
                    to={`/jokes/${joke.id}`}
                    fullWidth
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'inline-block'
                    }}
                  >
                    {joke.title}
                  </ButtonLink>
                </Grid>
              ))
            }
          </Grid>
        )
      }
      {
        (previousPage || nextPage) && (
          <Box marginTop={3}>
            <ButtonGroup variant="contained">
              <Button disabled={!previousPage} onClick={getPreviousPage}>
                &laquo;
              </Button>
              <Button disabled={!nextPage} onClick={getNextPage}>
                &raquo;
              </Button>
            </ButtonGroup>
          </Box>
        )
      }
    </Box>
  );
};

export default JokeList;
