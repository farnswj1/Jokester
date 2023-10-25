import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Stack } from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  JokeForm,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { setTitle } from 'utils';

const NewJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const navigate = useNavigate();
  setTitle('New Joke');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);

    APIService.post('/api/jokes/add/', data)
      .then(({ data, status }) => {
        setStatus(status);
        navigate(`/jokes/${data.id}`);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Paper component={Stack} spacing={3} padding={2}>
        <HeaderTypography>
          New Joke
        </HeaderTypography>
        {
          (status && status === 400) && (
            <ErrorTypography>
              Please double check your inputs.
            </ErrorTypography>
          )
        }
        {
          (status && status >= 500) && (
            <ServerErrorMessage />
          )
        }
        <JokeForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
};

export default NewJokePage;
