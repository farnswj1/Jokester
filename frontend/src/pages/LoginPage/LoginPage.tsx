import { FC, FormEvent, useState } from 'react';
import {
  Box,
  FormControl,
  TextField,
  Button,
  Container
} from '@mui/material';
import {
  HeaderTypography,
  PageContainer,
  ErrorTypography,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { paddingStyle, setTitle } from 'utils';

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const { login } = useAuth();
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
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageContainer maxWidth="sm">
      <HeaderTypography>
        Login
      </HeaderTypography>
      <Container>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
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
            <TextField
              id="username"
              name="username"
              label="Username"
              sx={paddingStyle}
              required
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              sx={paddingStyle}
              required
            />
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isLoading}
          >
            Login
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;
