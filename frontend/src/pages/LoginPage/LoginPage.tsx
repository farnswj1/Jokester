import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { ErrorTypography, HeaderTypography, ServerErrorMessage } from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';


const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  setTitle('Login');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);

    APIService.post('/api/login/', data)
      .then(({ status, data }) => {
        setStatus(status);
        login(data);
        navigate('/');
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper component={Stack} spacing={3} padding={2}>
        <HeaderTypography>
          Login
        </HeaderTypography>
        {
          status === 401 && (
            <ErrorTypography>
              Please enter a valid username and password.
            </ErrorTypography>
          )
        }
        {
          (status && status >= 500) && (
            <ServerErrorMessage />
          )
        }
        <Stack component="form" spacing={3} onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            color="secondary"
            fullWidth
            required
          />
          <Box>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
