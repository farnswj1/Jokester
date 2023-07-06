import { ChangeEvent, FC, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const { login } = useAuth();
  setTitle('Login');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

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
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            {
              status === 401 && (
                <Typography sx={{ mb: 3 }}>
                  Please enter a valid username and password.
                </Typography>
              )
            }
            {
              (status && status >= 500) && (
                <Typography sx={{ mb: 3 }}>
                  There was an error with the server!
                </Typography>
              )
            }
            <TextField
              id="username"
              name="username"
              label="Username"
              sx={{ mb: 3 }}
              required
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              sx={{ mb: 3 }}
              required
            />
          </FormControl>
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
