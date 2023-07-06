import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  Box,
  LinearProgress,
  Typography,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import { APIService } from 'services';
import { setTitle } from 'utils';
import { useAuth } from 'hooks';
import { Joke } from 'types';

const UpdateJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<number | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);
  const { id } = useParams();
  const { user} = useAuth();
  setTitle(`Update Joke ${id}`);

  const getJoke = () => {
    setIsLoading(true);

    APIService.get(`/api/jokes/${id}`)
      .then(({ data, status }) => {
        setStatus(status);
        setJoke(data);
      })
      .catch(({ response }) => {
        setStatus(response.status);
        setJoke(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    APIService.put(`jokes/${id}/update`, data)
      .then(({ status }) => {
        setStatus(status);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      });
  };

  useEffect(getJoke, []);

  const isStaff = user?.is_staff;

  if (isLoading) {
    return <LinearProgress color="inherit" />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Update Joke
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            {
              status === 400 && (
                <Typography sx={{ mb: 3 }}>
                  Please double check your inputs.
                </Typography>
              )
            }
            <TextField
              id="title"
              name="title"
              label="Title"
              sx={{ mb: 3 }}
              defaultValue={joke?.title}
              required
            />
            <TextField
              id="body"
              name="body"
              label="Body"
              sx={{ mb: 3 }}
              multiline
              maxRows={30}
              defaultValue={joke?.body}
              required
            />
          </FormControl>
          <Button variant="contained" type="submit" size="large">
            Submit
          </Button>
          </Box>
      </Grid>
    </Grid>
  );
};

export default UpdateJokePage;
