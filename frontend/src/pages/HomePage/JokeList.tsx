import { FC } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText, ButtonGroup, Button } from '@mui/material';

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
    <List>
      {
        jokes.map(joke => (
          <ListItemButton key={joke.id}>
            <Link to={`/jokes/${joke.id}`}>
              <ListItemText primary={joke.title} />
            </Link>
          </ListItemButton>
        ))
      }
      {
        (previousPage || nextPage) && (
          <ButtonGroup
            variant="contained"
            sx={{ mt: 5 }}
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
    </List>
  );
};

export default JokeList;
