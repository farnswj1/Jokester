import { FC, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Typography } from '@mui/material';
import {
  HeaderTypography,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { footerStyle, paddingStyle, parseISOToLocale, setTitle } from 'utils';
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
    <PageContainer>
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
        profile && (
          <Fragment>
            <Typography sx={paddingStyle}>
              {'Username: ' + profile.username}
            </Typography>
            <Typography>
              {'Date Joined: ' + parseISOToLocale(profile.date_joined)}
            </Typography>
          </Fragment>
        )
      }
      {
        (profile && hasPermission) && (
          <ButtonGroup variant="contained" sx={footerStyle}>
            <Button size="large">
              <Link to={`/users/${profile.id}/update`}>
                Update
              </Link>
            </Button>
            <Button size="large" onClick={handleOpenDeleteModal}>
              Delete
            </Button>
            <DeleteUserModal
              open={openDeleteModal}
              onClose={handleCloseDeleteModal}
              onDelete={deleteProfile}
            />
          </ButtonGroup>
        )
      }
    </PageContainer>
  );
};

export default UserProfilePage;
