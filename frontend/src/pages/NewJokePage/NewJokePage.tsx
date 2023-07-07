import { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import { APIService } from 'services';
import { setTitle } from 'utils';

const NewJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const navigate = useNavigate();
  setTitle('New Joke');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    APIService.post('/api/jokes/add/', data)
      .then(({ data, status }) => {
        setStatus(status);
        navigate(`/jokes/${data.id}`)
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          New Joke
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            {
              status && status >= 400 && (
                <Typography sx={{ mb: 3, color: 'red' }}>
                  Please double check your inputs.
                </Typography>
              )
            }
            <TextField
              id="title"
              name="title"
              label="Title"
              sx={{ mb: 3 }}
              required
            />
            <TextField
              id="body"
              name="body"
              label="Body"
              sx={{ mb: 3 }}
              multiline
              maxRows={30}
              required
            />
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled={isLoading}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NewJokePage;
