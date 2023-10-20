import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  JokeForm,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { setTitle } from 'utils';
import { Joke } from 'types';

const UpdateJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  setTitle(`Update Joke #${id}`);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);

    APIService.put(`/api/jokes/${id}/`, data)
      .then(({ status }) => {
        setStatus(status);
        navigate(`/jokes/${id}`);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getJoke, [id]);

  return (
    <Container>
      <Stack spacing={3}>
        <HeaderTypography>
          Update Joke
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
          status === 400 && (
            <ErrorTypography>
              Please double check your inputs.
            </ErrorTypography>
          )
        }
        {
          joke && (
            <JokeForm
              isLoading={isLoading}
              onSubmit={handleSubmit}
              joke={joke}
            />
          )
        }
      </Stack>
    </Container>
  );
};

export default UpdateJokePage;
