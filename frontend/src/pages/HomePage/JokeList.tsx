import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, Grid, Typography } from '@mui/material';
import { footerStyle } from 'utils';

interface JokeListProps {
  jokes: any[]
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
    <Fragment>
      {
        jokes.length === 0 ? (
          <Typography variant="h5">
            No joke met the search criteria.
          </Typography>
        ) : (
          <Grid container justifyContent="center" spacing={2}>
            {
              jokes.map(joke => (
                <Grid item xs={12} sm={12} md={6} key={joke.id}>
                  <Link to={`/jokes/${joke.id}`}>
                    <Button variant="contained" fullWidth>
                      {joke.title}
                    </Button>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        )
      }
      {
        (previousPage || nextPage) && (
          <ButtonGroup
            variant="contained"
            sx={footerStyle}
          >
            <Button
              size="large"
              disabled={!previousPage}
              onClick={getPreviousPage}
            >
              &laquo;
            </Button>
            <Button
              size="large"
              disabled={!nextPage}
              onClick={getNextPage}
            >
              &raquo;
            </Button>
          </ButtonGroup>
        )
      }
    </Fragment>
  );
};

export default JokeList;
