import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField
} from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { setTitle } from 'utils';

const RegisterUserPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const navigate = useNavigate();
  setTitle('Register');

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target.name;
    let passwordElement: HTMLInputElement;
    let confirmPasswordElement: HTMLInputElement;

    if (element === 'password') {
      confirmPasswordElement = document.querySelector('[name="confirm_password"]') as HTMLInputElement;
      passwordElement = event.target;
    } else if (element ==='confirm_password') {
      passwordElement = document.querySelector('[name="password"]') as HTMLInputElement;
      confirmPasswordElement = event.target;
    } else {
      passwordElement = document.querySelector('[name="password"]') as HTMLInputElement;
      confirmPasswordElement = document.querySelector('[name="confirm_password"]') as HTMLInputElement;
    }

    const passwordValue = passwordElement.value;
    const confirmPasswordValue = confirmPasswordElement.value;

    setDisableSubmit(
      !passwordValue || !confirmPasswordValue || (passwordValue !== confirmPasswordValue)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);
    data.delete('confirm_password');

    APIService.post('/api/users/register/', data)
      .then(({ status }) => {
        setStatus(status);
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
    <Container>
      <Paper component={Stack} spacing={3} padding={2}>
        <HeaderTypography>
          Sign Up!
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
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="first_name"
                label="First Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirm_password"
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={handlePasswordChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Box marginTop={3}>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading || disableSubmit}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterUserPage;
