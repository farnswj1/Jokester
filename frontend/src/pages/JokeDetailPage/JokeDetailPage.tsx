import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import { ButtonLink, JokeInformation, LoadingBar, ServerErrorMessage } from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { setTitle } from 'utils';
import { Joke } from 'types';
import DeleteJokeModal from './DeleteJokeModal';

const JokeDetailPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const hasPermission = user?.hasGroup('Administrators');
  setTitle(joke ? joke.title : `Joke #${id}`);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getJoke = () => {
    setIsLoading(true);
    setStatus(null);
    setJoke(null);

    APIService.get(`/api/jokes/${id}/`)
      .then(({ data, status }) => {
        setStatus(status);
        setJoke(data);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteJoke = () => {
    setIsLoading(true);
    setStatus(null);
    setJoke(null);

    APIService.delete(`/api/jokes/${id}/`)
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

  useEffect(getJoke, [id]);

  return (
    <Container>
      <Stack spacing={3}>
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
          joke && (
            <JokeInformation joke={joke} />
          )
        }
        {
          (joke && hasPermission) && (
            <Stack direction="row" spacing={1}>
              <ButtonLink
                variant="outlined"
                color="secondary"
                to={`/jokes/${joke.id}/update`}
              >
                Update
              </ButtonLink>
              <Button
                variant="text"
                color="secondary"
                onClick={handleOpenDeleteModal}
              >
                Delete
              </Button>
              <DeleteJokeModal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onDelete={deleteJoke}
              />
            </Stack>
          )
        }
      </Stack>
    </Container>
  );
};

export default JokeDetailPage;
