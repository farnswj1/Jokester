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
import { useAuth } from 'hooks';
import { setTitle } from 'utils';

const NewJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  setTitle('New Joke');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    APIService.post('/api/jokes/create/', data)
      .then(({ status }) => {
        setStatus(status);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      });
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="h4" sx={{ mb: 5 }}>New Joke</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined">
            {
              status && status >= 400 && (
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
            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>
          </Box>
      </Grid>
    </Grid>
  );
};

export default NewJokePage;