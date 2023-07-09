import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import {
  ErrorTypography,
  HeaderTypography,
  PageContainer,
  ServerErrorMessage
} from 'components';
import { APIService } from 'services';
import { paddingStyle, setTitle } from 'utils';

const NewJokePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  const navigate = useNavigate();
  setTitle('New Joke');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);

    const data = new FormData(event.currentTarget);

    APIService.post('/api/jokes/add/', data)
      .then(({ data, status }) => {
        setStatus(status);
        navigate(`/jokes/${data.id}`);
      })
      .catch(({ response }) => {
        setStatus(response.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageContainer>
      <HeaderTypography>
        New Joke
      </HeaderTypography>
      <Box component="form" onSubmit={handleSubmit}>
        {
          (status && status === 400) && (
            <ErrorTypography>
              Please double check your inputs.
            </ErrorTypography>
          )
        }
        {
          (status && status >= 500) && (
            <ServerErrorMessage />
          )
        }
        <FormControl fullWidth variant="outlined">
          <TextField
            id="title"
            name="title"
            label="Title"
            sx={paddingStyle}
            required
          />
          <TextField
            id="body"
            name="body"
            label="Body"
            sx={paddingStyle}
            multiline
            rows={10}
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
    </PageContainer>
  );
};

export default NewJokePage;
