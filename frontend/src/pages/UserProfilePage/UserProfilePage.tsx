import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '@mui/material';
import { ButtonLink, HeaderTypography, LoadingBar, ServerErrorMessage } from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { parseISOToLocale, setTitle } from 'utils';
import { UserProfile } from 'types';
import DeleteUserModal from './DeleteUserModal';

const UserProfilePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const hasPermission = (user?.id === id || user?.hasGroup('Administrators'));
  setTitle(profile ? profile.username : `User #${id}`);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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

  const deleteProfile = () => {
    setIsLoading(true);
    setStatus(null);
    setProfile(null);

    APIService.delete(`/api/users/${id}/`)
      .then(({ status }) => {
        setStatus(status);

        if (user?.id === id) {
          logout();
        } else {
          navigate('/users');
        }
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
      <Stack spacing={3}>
        <HeaderTypography>
          User Profile
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
          profile && ([
            <Typography key={0}>
              {'Username: ' + profile.username}
            </Typography>,
            <Typography key={1}>
              {'Date Joined: ' + parseISOToLocale(profile.date_joined)}
            </Typography>
          ])
        }
        {
          (profile && hasPermission) && (
            <Stack direction="row" spacing={1}>
              <ButtonLink variant="outlined" to={`/users/${profile.id}/update`}>
                Update
              </ButtonLink>
              <Button variant="text" onClick={handleOpenDeleteModal}>
                Delete
              </Button>
              <DeleteUserModal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onDelete={deleteProfile}
              />
            </Stack>
          )
        }
      </Stack>
    </Container>
  );
};

export default UserProfilePage;
