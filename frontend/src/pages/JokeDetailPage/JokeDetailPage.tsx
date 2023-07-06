import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, LinearProgress, ButtonGroup, Button } from '@mui/material';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';
import { Joke } from 'types';

const JokeDetailPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  setTitle(joke ? joke.id : 'Joke');

  const getJoke = () => {
    setIsLoading(true);

    APIService.get(`/api/jokes/${id}/`)
      .then(({ data, status }) => {
        setStatus(status);
        setJoke(data);
      })
      .catch(({ response }) => {
        setStatus(response.status);
        setJoke(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteJoke = () => {
    if (window.confirm("Are you sure you want to delete this joke?")) {
      APIService.delete(`/api/jokes/${id}/delete/`)
        .then(({ status }) => {
          setStatus(status);
          navigate('/');
        })
        .catch(({ response}) => {
          setStatus(response.status);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(getJoke, [id]);

  const isStaff = user?.is_staff;

  return (
    <Box>
      {
        isLoading ? (
          <LinearProgress color="inherit" />
        ) : status && status >= 500 ? (
          <Typography variant="h5">
            There was an error with the server.
          </Typography>
        ) : (
          <Box>
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
            {
              isStaff && (
                <ButtonGroup sx={{ mt: 5 }} variant="contained">
                  <Button size="large">
                    <Link to={`/${joke?.id}/update`}>
                      Update
                    </Link>
                  </Button>
                  <Button size="large" onClick={deleteJoke}>
                    Delete
                  </Button>
                </ButtonGroup>
              )
            }
          </Box>
        )
      }
    </Box>
  );
};

export default JokeDetailPage;
