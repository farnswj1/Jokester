import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { paddingStyle, setTitle } from 'utils';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';

const RegisterUserPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const navigate = useNavigate();
  setTitle('Register');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <PageContainer>
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
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} columnSpacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="username"
                name="username"
                label="Username"
                sx={paddingStyle}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                sx={paddingStyle}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                sx={paddingStyle}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="last_name"
                name="last_name"
                label="Last Name"
                sx={paddingStyle}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                sx={paddingStyle}
                onChange={handlePasswordChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                sx={paddingStyle}
                onChange={handlePasswordChange}
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isLoading || disableSubmit}
          >
            Register
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default RegisterUserPage;
