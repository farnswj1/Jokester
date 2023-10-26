import { FC } from 'react';
import {
  Box,
  ButtonGroup,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import { RouterLink } from 'components';
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
          <Stack spacing={3}>
            {
              jokes.map(joke => (
                <Card key={joke.id}>
                  <CardActionArea component={RouterLink} to={`/jokes/${joke.id}`}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        display="block"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {joke.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By: {joke.author.username}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            }
          </Stack>
        )
      }
      {
        (previousPage || nextPage) && (
          <Box marginTop={3}>
            <ButtonGroup variant="contained">
              <Button
                color="secondary"
                disabled={!previousPage}
                onClick={getPreviousPage}
              >
                &laquo;
              </Button>
              <Button
                color="secondary"
                disabled={!nextPage}
                onClick={getNextPage}
              >
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
