import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  ButtonLink,
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';
import { UserProfile } from 'types';

const UpdateUserPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  setTitle(`Update User #${id}`);

  const getProfile = () => {
    setIsLoading(true);
    setStatus(null);
    setProfile(null);

    APIService.get(`/api/users/${id}/`)
      .then(({ data, status }) => {
        setStatus(status);
        setProfile(data);
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

    APIService.put(`/api/users/${id}/`, data)
      .then(({ status }) => {
        setStatus(status);
        navigate(`/users/${id}`);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getProfile, [id]);

  return (
    <Container>
      <Paper component={Stack} spacing={3} padding={2}>
        <HeaderTypography>
          Update User
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
          profile && (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3} columnSpacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    defaultValue={profile.username}
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
                    defaultValue={profile.email}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    defaultValue={profile.first_name}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    defaultValue={profile.last_name}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <Stack
                direction="row"
                justifyContent="space-between"
                marginTop={3}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
                {
                  user?.id === id && (
                    <ButtonLink
                      variant="outlined"
                      to={`/users/${id}/password/`}
                    >
                      Change Password
                    </ButtonLink>
                  )
                }
              </Stack>
            </Box>
          )
        }
      </Paper>
    </Container>
  );
};

export default UpdateUserPage;
