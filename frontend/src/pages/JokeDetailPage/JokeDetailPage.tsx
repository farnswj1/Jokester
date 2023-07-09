import { FC, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import {
  JokeInformation,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
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
  const isStaff = user?.is_staff;
  setTitle(joke ? joke.title : `Joke #${id}`);

  const getJoke = () => {
    setIsLoading(true);
    setStatus(null);
    setJoke(null);

    APIService.get(`/api/jokes/${id}/`)
      .then(({ data, status }) => {
        setStatus(status);
        setJoke(data);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteJoke = () => {
    if (window.confirm("Are you sure you want to delete this joke?")) {
      APIService.delete(`/api/jokes/${id}/`)
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

  return (
    <PageContainer>
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
      <ButtonGroup variant="contained">
        <Button size="large">
          <Link to="/">
            Back
          </Link>
        </Button>
        {
          isStaff && (
            <Fragment>
              <Button size="large">
                <Link to={`/jokes/${joke?.id}/update`}>
                  Update
                </Link>
              </Button>
              <Button size="large" onClick={deleteJoke}>
                Delete
              </Button>
            </Fragment>
          )
        }
      </ButtonGroup>
    </PageContainer>
  );
};

export default JokeDetailPage;
