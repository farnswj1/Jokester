import { FC, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { paddingStyle, setTitle } from 'utils';
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
    <PageContainer>
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
            <Grid container rowSpacing={2} columnSpacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="username"
                    name="username"
                    label="Username"
                    sx={paddingStyle}
                    defaultValue={profile.username}
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
                    defaultValue={profile.email}
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
                    defaultValue={profile.first_name}
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
                    defaultValue={profile.last_name}
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
                disabled={isLoading}
              >
                Save
              </Button>
              {
                user?.id === id && (
                  <Button variant="contained" size="large">
                    <Link to={`/users/${id}/password/`}>
                      Change Password
                    </Link>
                  </Button>
                )
              }
            </Box>
          </Box>
        )
      }
    </PageContainer>
  );
};

export default UpdateUserPage;
