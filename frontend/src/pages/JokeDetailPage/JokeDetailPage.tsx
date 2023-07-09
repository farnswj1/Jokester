import { FC, Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import {
  JokeInformation,
  LoadingBar,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { useAuth } from 'hooks';
import { footerStyle, setTitle } from 'utils';
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
    <PageContainer>
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
      <ButtonGroup variant="contained" sx={footerStyle}>
        <Button size="large">
          <Link to="/">
            Back
          </Link>
        </Button>
        {
          (joke && hasPermission) && (
            <Fragment>
              <Button size="large">
                <Link to={`/jokes/${joke.id}/update`}>
                  Update
                </Link>
              </Button>
              <Button size="large" onClick={handleOpenDeleteModal}>
                Delete
              </Button>
              <DeleteJokeModal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onDelete={deleteJoke}
              />
            </Fragment>
          )
        }
      </ButtonGroup>
    </PageContainer>
  );
};

export default JokeDetailPage;
